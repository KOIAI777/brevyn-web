/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import cardGLB from "../assets/lanyard/card.glb";
import lanyardTexture from "../assets/lanyard/lanyard.png";

const email = "1146850129@qq.com";
type AnchorPoint = { x: number; y: number } | null;
type LanyardContactProps = {
  active?: boolean;
  anchor?: AnchorPoint;
};

type CardGLTF = {
  nodes: {
    card: THREE.Mesh<THREE.BufferGeometry>;
    clip: THREE.Mesh<THREE.BufferGeometry>;
    clamp: THREE.Mesh<THREE.BufferGeometry>;
  };
  materials: {
    base: THREE.MeshStandardMaterial & { map: THREE.Texture };
    metal: THREE.Material;
  };
};

type PointBody = RapierRigidBody & { lerped?: THREE.Vector3 };

function createEmailCardTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1208;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const drawFace = (x: number, y: number, w: number, h: number, back = false) => {
    const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, back ? "#f7efe3" : "#fffdf8");
    gradient.addColorStop(0.56, back ? "#e8dece" : "#f3eadc");
    gradient.addColorStop(1, back ? "#d7c6ad" : "#d9c6a9");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "rgba(23,21,18,0.12)";
    ctx.lineWidth = 4;
    ctx.strokeRect(x + 18, y + 18, w - 36, h - 36);

    ctx.fillStyle = "rgba(169,120,36,0.16)";
    for (let i = 0; i < 16; i += 1) {
      const px = x + 64 + ((i * 97) % (w - 128));
      const py = y + 72 + ((i * 149) % (h - 144));
      ctx.beginPath();
      ctx.arc(px, py, i % 3 === 0 ? 5 : 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(33,25,15,0.76)";
    ctx.font = "700 42px Inter, system-ui, sans-serif";
    ctx.fillText(back ? "Brevyn" : "CONTACT", x + 88, y + 130);

    if (back) {
      ctx.font = "600 36px Inter, system-ui, sans-serif";
      ctx.fillStyle = "rgba(95,90,81,0.82)";
      ctx.fillText("Local-first study workspace", x + 88, y + 205);
      ctx.fillStyle = "rgba(169,120,36,0.74)";
      ctx.fillRect(x + 88, y + 252, w - 176, 4);
      return;
    }

    ctx.font = "800 56px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#171512";
    ctx.fillText("Koi", x + 88, y + 242);

    ctx.font = "600 34px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(95,90,81,0.9)";
    ctx.fillText("Brevyn contact", x + 88, y + 296);

    const chipX = x + 88;
    const chipY = y + 380;
    const chipW = w - 176;
    const chipH = 118;
    const radius = 34;
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, chipW, chipH, radius);
    ctx.fillStyle = "rgba(255,255,255,0.74)";
    ctx.fill();
    ctx.strokeStyle = "rgba(23,21,18,0.12)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = "700 43px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#5e4931";
    ctx.fillText(email, chipX + 42, chipY + 73);

    ctx.fillStyle = "rgba(169,120,36,0.72)";
    ctx.font = "700 28px Inter, system-ui, sans-serif";
    ctx.fillText("EMAIL", x + 88, y + h - 118);
  };

  drawFace(0, 0, canvas.width / 2, canvas.height);
  drawFace(canvas.width / 2, 0, canvas.width / 2, canvas.height, true);
  return canvas;
}

function screenToWorld(point: { x: number; y: number }, state: Parameters<Parameters<typeof useFrame>[0]>[0], target: THREE.Vector3, dir: THREE.Vector3) {
  target.set((point.x / state.size.width) * 2 - 1, -(point.y / state.size.height) * 2 + 1, 0.5).unproject(state.camera);
  dir.copy(target).sub(state.camera.position).normalize();
  target.copy(state.camera.position).add(dir.multiplyScalar(-state.camera.position.z / dir.z));
}

function LanyardScene({ active, anchor }: { active: boolean; anchor: AnchorPoint }) {
  const band = useRef<THREE.Mesh | null>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<PointBody>(null!);
  const j2 = useRef<PointBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 760);
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const initialized = useRef(false);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const anchorWorld = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
    [],
  );
  const { nodes, materials } = useGLTF(cardGLB) as unknown as CardGLTF;
  const texture = useTexture(lanyardTexture);
  const bandGeometry = useMemo(() => new MeshLineGeometry(), []);
  const bandMaterial = useMemo(
    () =>
      new MeshLineMaterial({
        color: "white",
        lineWidth: 0.9,
        map: texture,
        repeat: new THREE.Vector2(-4, 1),
        resolution: new THREE.Vector2(1000, 1000),
        useMap: 1,
      }),
    [texture],
  );

  const cardMap = useMemo(() => {
    const atlas = createEmailCardTexture();
    const composite = new THREE.CanvasTexture(atlas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = materials.base.map.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [materials.base.map.flipY]);

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 760);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    initialized.current = false;
  }, [anchor?.x, anchor?.y]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useEffect(() => {
    bandMaterial.depthTest = false;
    bandMaterial.map = texture;
    bandMaterial.repeat.set(-4, 1);
    bandMaterial.resolution.set(1000, isMobile ? 2000 : 1000);
    bandMaterial.needsUpdate = true;
  }, [bandMaterial, isMobile, texture]);

  useRopeJoint(fixed, j1, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useRopeJoint(j1, j2, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useRopeJoint(j2, j3, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useFrame((state, delta) => {
    if (!active) return;

    if (anchor && fixed.current) {
      screenToWorld(anchor, state, anchorWorld, dir);
      fixed.current.setTranslation({ x: anchorWorld.x, y: anchorWorld.y, z: 0 }, true);

      if (!initialized.current && j1.current && j2.current && j3.current && card.current) {
        const bodies: Array<[RapierRigidBody, number, number]> = [
          [j1.current, 0.2, -1.05],
          [j2.current, 0.1, -2.05],
          [j3.current, 0, -3.05],
          [card.current, 0, -3.55],
        ];

        bodies.forEach(([body, xOffset, yOffset]) => {
          body.setTranslation({ x: anchorWorld.x + xOffset, y: anchorWorld.y + yOffset, z: 0 }, true);
          body.setLinvel({ x: 0, y: 0, z: 0 }, true);
          body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        });
        initialized.current = true;
      }
    }

    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current || !band.current) return;

    [j1, j2].forEach((ref) => {
      const body = ref.current;
      if (!body) return;
      if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());
      const clampedDistance = Math.max(0.1, Math.min(1, body.lerped.distanceTo(body.translation())));
      body.lerped.lerp(body.translation(), delta * (0 + clampedDistance * 50));
    });

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped ?? j2.current.translation());
    curve.points[2].copy(j1.current.lerped ?? j1.current.translation());
    curve.points[3].copy(fixed.current.translation());
    const geometry = band.current.geometry as MeshLineGeometry;
    geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 0, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, -0.9, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, -1.8, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, -2.7, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, -3.2, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.75}
            position={[0, -1.28, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event: ThreeEvent<PointerEvent>) => {
              event.stopPropagation();
              (event.target as Element).releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event: ThreeEvent<PointerEvent>) => {
              event.stopPropagation();
              (event.target as Element).setPointerCapture(event.pointerId);
              drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={cardMap} map-anisotropy={16} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.22} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} geometry={bandGeometry}>
        <primitive object={bandMaterial} attach="material" />
      </mesh>
    </>
  );
}

export function LanyardContact({ active = true, anchor }: LanyardContactProps) {
  return (
    <div className="lanyard-contact" aria-label="Brevyn 联系邮箱挂绳卡片">
      <Canvas camera={{ position: [0, 0, 30], fov: 24 }} dpr={[1, 1.7]} gl={{ alpha: true }}>
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <LanyardScene active={active} anchor={anchor ?? null} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={8} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

useGLTF.preload(cardGLB);
