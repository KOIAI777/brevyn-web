import { useEffect, useRef, useState } from "react";
import { Apple, Code2, Download, MonitorDown } from "lucide-react";
import { LanyardContact } from "./components/LanyardContact";
import PixelBlast from "./components/PixelBlast/PixelBlast";
import "./styles.css";

const officialReleaseUrl = "https://github.com/KOIAI777/brevyn-releases/releases/latest";
const communityReleaseUrl = "https://github.com/KOIAI777/brevyn/releases/latest";
const communitySourceUrl = "https://github.com/KOIAI777/brevyn";

type Platform = "macos" | "windows";
type ReleaseAsset = { name: string; size: number; url: string };
type ReleaseManifest = {
  edition: "official" | "community";
  channel: "stable" | "prerelease";
  tag: string;
  generatedAt: string;
  assets: ReleaseAsset[];
};
type ReleaseCatalog = {
  official: ReleaseManifest | null;
  community: ReleaseManifest | null;
  loading: boolean;
};
type ContactAnchor = { x: number; y: number };
type HeroPixelFieldProps = {
  paused?: boolean;
};

function isReleaseManifest(value: unknown): value is ReleaseManifest {
  if (!value || typeof value !== "object") return false;
  const manifest = value as Partial<ReleaseManifest>;
  return typeof manifest.tag === "string" && Array.isArray(manifest.assets)
    && manifest.assets.every((asset) => asset && typeof asset.name === "string" && typeof asset.size === "number" && typeof asset.url === "string");
}

async function fetchReleaseManifest(url: string, signal: AbortSignal): Promise<ReleaseManifest> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Release manifest request failed: ${response.status}`);
  const manifest: unknown = await response.json();
  if (!isReleaseManifest(manifest)) throw new Error("Release manifest is invalid.");
  return manifest;
}

function useReleaseCatalog(): ReleaseCatalog {
  const [catalog, setCatalog] = useState<ReleaseCatalog>({ official: null, community: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    void Promise.allSettled([
      fetchReleaseManifest("/api/releases/official", controller.signal),
      fetchReleaseManifest("/api/releases/community", controller.signal),
    ]).then(([official, community]) => {
      if (controller.signal.aborted) return;
      setCatalog({
        official: official.status === "fulfilled" ? official.value : null,
        community: community.status === "fulfilled" ? community.value : null,
        loading: false,
      });
    });
    return () => controller.abort();
  }, []);

  return catalog;
}

function detectPlatform(): Platform {
  return /windows|win32|win64/i.test(navigator.userAgent) ? "windows" : "macos";
}

function findInstaller(manifest: ReleaseManifest | null, platform: Platform): ReleaseAsset | null {
  const suffix = platform === "macos" ? ".dmg" : ".exe";
  return manifest?.assets.find((asset) => asset.name.toLowerCase().endsWith(suffix)) ?? null;
}

function formatFileSize(bytes: number): string {
  return `${Math.round(bytes / 1_000_000)} MB`;
}

function platformDetail(platform: Platform): string {
  return platform === "macos" ? "Apple Silicon" : "Windows x64";
}

function platformDownloadLabel(platform: Platform): string {
  return platform === "macos" ? "macOS（Apple Silicon）" : "Windows（x64）";
}

const navLinks = [
  { href: "#product", label: "产品" },
  { href: "#context", label: "上下文" },
  { href: "#trust", label: "本地优先" },
  { href: "#download", label: "下载" },
];

const capabilityTags = ["课程资料", "PDF / PPTX / DOCX", "OCR 解析", "RAG 检索", "Embedding", "本地向量索引", "文件证据", "Agent 会话"];
const contextTags = ["课程空间", "资料归档", "本地索引", "RAG 上下文", "任务会话"];

const contextItems = [
  ["学期", "按学期聚合课程、任务和近期活动，保留长期学习结构。"],
  ["课程", "每门课都有独立资料空间，reading、slides、rubric 和笔记不会混在一起。"],
  ["任务", "essay、exam、project 和 revision 以任务为单位承载文件、目标和会话记录。"],
  ["资料", "资料先解析成可检索证据，再进入 RAG 和 Agent 的上下文范围。"],
];

const features = [
  {
    index: "01 / 导入",
    title: "课程资料归档",
    body: "把 reading、rubric、lecture slides、draft 和截图归入对应课程或任务，建立清楚的资料边界。",
    tags: ["课程", "作业", "Reading", "Rubric"],
  },
  {
    index: "02 / 解析",
    title: "本地解析管线",
    body: "将 PDF、PPTX、文档和作业要求拆成可检索片段；扫描件、截图和课表类材料可接入 OCR / Vision。",
    tags: ["PDF 解析", "PPTX 解析", "OCR / Vision", "索引队列"],
  },
  {
    index: "03 / 检索",
    title: "RAG 证据检索",
    body: "回答优先从当前课程和任务的已索引资料中召回证据，用于概念解释、论文论据和 rubric 条件核对。",
    tags: ["语义检索", "课程范围", "引用来源", "文件证据"],
  },
  {
    index: "04 / 向量",
    title: "本地向量索引层",
    body: "Embedding 和向量检索围绕本地工作区运行，索引按课程和任务隔离，资料更新后可以重新构建。",
    tags: ["Embedding", "向量检索", "本地存储", "可重建索引"],
    wide: true,
  },
  {
    index: "05 / Agent",
    title: "面向任务的 Agent",
    body: "从 essay、exam、project 启动上下文会话，带上相关资料、任务目标和历史记录；本地文件操作保留确认流程。",
    tags: ["Essay", "Exam", "Project", "权限确认"],
    wide: true,
  },
];

const demoCards = [
  {
    src: "/assets/generated/actual-workspace-files.png",
    alt: "Brevyn 实机工作区截图，左侧显示课程列表，中间是学期会话，右侧显示会话文件和课程文件树。",
    title: "文件栏与会话上下文",
    body: "会话文件、课程文件和学期资料在右侧 rail 中展开，适合检查当前 Agent 能看到哪些上下文。",
    tags: ["会话文件", "课程文件树", "学期资料"],
  },
  {
    src: "/assets/generated/actual-workspace-sources.png",
    alt: "Brevyn 实机工作区截图，右侧来源面板展示当前范围、学期资料、课程资料和待索引状态。",
    title: "来源范围与索引状态",
    body: "来源面板区分学期资料和本学期课程资料，清楚显示当前范围、文件数量和待索引状态。",
    tags: ["来源面板", "范围控制", "索引状态"],
  },
  {
    src: "/assets/generated/course-create.png",
    alt: "Brevyn 我的课程弹层，展示课程列表、学期资料和添加课程表单。",
    title: "课程创建",
    body: "课程名称、代码、教师和资料会进入同一个课程空间，后续索引、检索和 Agent 会话都围绕这个空间展开。",
    tags: ["课程空间", "资料归档", "本地索引", "RAG 上下文"],
  },
  {
    src: "/assets/generated/brevyn-window.png",
    alt: "Brevyn 任务工作区界面。",
    title: "任务工作区",
    body: "为 essay、exam 和 project 创建独立工作区，把课程资料、文件证据和 AI 会话放在同一个任务里。",
    tags: ["任务上下文", "文件证据", "Agent 会话", "权限确认"],
  },
];

const trustItems = [
  ["本地工作区", "课程和任务组织从桌面应用开始。"],
  ["文件证据", "把 reading、rubric、draft 和笔记变成可持续使用的学习上下文。"],
  ["权限确认", "敏感本地操作通过应用运行时和确认流程执行。"],
  ["按需使用 Cloud", "套餐可同步官方模型能力、OCR、Vision 和 Embedding。"],
];

function GithubMark() {
  return (
    <svg className="github-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18.92-.26 1.91-.38 2.89-.39.98.01 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  );
}

function DownloadButton({
  manifest,
  platform,
  loading,
}: {
  manifest: ReleaseManifest | null;
  platform: Platform;
  loading: boolean;
}) {
  const installer = findInstaller(manifest, platform);
  const label = platformDownloadLabel(platform);

  if (!installer) {
    return (
      <button className="button primary download-cta" type="button" disabled aria-busy={loading}>
        <Download className="button-icon" aria-hidden="true" />
        <span>{loading ? `正在获取 ${label} 下载` : `${label} 下载暂不可用`}</span>
      </button>
    );
  }

  return (
    <a
      className="button primary download-cta"
      href={installer.url}
      rel="noopener noreferrer"
    >
      <Download className="button-icon" aria-hidden="true" />
      <span>下载 {label}</span>
    </a>
  );
}

function MailIcon() {
  return (
    <svg className="mail-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.75 6.75h14.5v10.5H4.75V6.75Z" />
      <path d="m5.25 7.25 6.75 5.5 6.75-5.5" />
    </svg>
  );
}

function HeroPixelField({ paused = false }: HeroPixelFieldProps) {
  return (
    <div className={`hero-pixel-field${paused ? " is-paused" : ""}`} aria-hidden="true">
      <PixelBlast
        variant="square"
        color="#d18a5b"
        pixelSize={2}
        patternScale={4}
        patternDensity={1.45}
        pixelSizeJitter={1.3}
        speed={paused ? 0 : 1.5}
        edgeFade={0.25}
        enableRipples
        rippleSpeed={0.3}
        rippleThickness={0.1}
        rippleIntensityScale={1}
        transparent
        autoPauseOffscreen
        globalPointer
      />
    </div>
  );
}

function Header({ contactOpen, setContactOpen }: { contactOpen: boolean; setContactOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [contactMounted, setContactMounted] = useState(false);
  const [contactAnchor, setContactAnchor] = useState<ContactAnchor | null>(null);
  const navInnerRef = useRef<HTMLDivElement | null>(null);
  const contactButtonRef = useRef<HTMLButtonElement | null>(null);

  const updateContactAnchor = () => {
    const buttonRect = contactButtonRef.current?.getBoundingClientRect();
    const navRect = navInnerRef.current?.getBoundingClientRect();
    if (!buttonRect) return;
    setContactAnchor({
      x: buttonRect.left + buttonRect.width / 2,
      y: navRect ? navRect.bottom + 2 : buttonRect.bottom + 2,
    });
  };

  useEffect(() => {
    updateContactAnchor();
    const timer = window.setTimeout(() => setContactMounted(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    updateContactAnchor();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };

    window.addEventListener("resize", updateContactAnchor);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", updateContactAnchor);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contactOpen]);

  return (
    <header className="nav">
      <div className="nav-inner" ref={navInnerRef}>
        <a className="brand" href="#top" aria-label="Brevyn 首页">
          <img src="/assets/generated/brevyn-app-icon.png" alt="" />
          <span className="brand-mark">
            <span>Brevyn</span>
            <span>学习工作台</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            ref={contactButtonRef}
            className="button ghost contact-toggle icon-button"
            type="button"
            aria-label={contactOpen ? "收起联系牌" : "打开联系牌"}
            aria-expanded={contactOpen}
            aria-controls="contact-lanyard"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              if (!contactOpen) {
                updateContactAnchor();
                setContactMounted(true);
              }
              setContactOpen((open) => !open);
            }}
          >
            <MailIcon />
          </button>
          <details className="nav-menu">
            <summary className="button button-menu nav-menu-button" aria-label="打开导航菜单">
              <span className="nav-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </summary>
            <div className="nav-menu-panel" aria-label="移动端主导航">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
      {contactMounted ? (
        <div className={`contact-lanyard-layer${contactOpen ? " is-open" : ""}`} id="contact-lanyard" aria-hidden={!contactOpen}>
          <LanyardContact active={contactOpen} anchor={contactAnchor} />
        </div>
      ) : null}
    </header>
  );
}

function Hero({
  pixelPaused = false,
  manifest,
  platform,
  loading,
}: {
  pixelPaused?: boolean;
  manifest: ReleaseManifest | null;
  platform: Platform;
  loading: boolean;
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroPixelField paused={pixelPaused} />
      <div className="hero-inner">
        <div className="hero-app-icon" aria-hidden="true">
          <img src="/assets/generated/brevyn-app-icon.png" alt="" />
        </div>
        <h1 id="hero-title">Brevyn</h1>
        <p className="hero-copy">
          面向课程资料管理、RAG 检索和作业任务的本地优先 AI 学习工作台。
        </p>
        <div className="hero-actions">
          <DownloadButton manifest={manifest} platform={platform} loading={loading} />
          <a className="button" href="#download">
            查看全部版本
          </a>
        </div>
        <div className="hero-release-meta" aria-live="polite">
          <span>Brevyn Official</span>
          <span>{manifest?.tag ?? "最新稳定版"}</span>
          <span>{platformDetail(platform)}</span>
        </div>
        <div className="meta-row" aria-label="产品亮点">
          <span>本地优先桌面工作区</span>
          <span>课程资料 RAG 检索</span>
          <span>面向任务的 Agent 会话</span>
        </div>
      </div>

      <div className="hero-window-wrap">
        <div className="halo" aria-hidden="true" />
        <div className="window">
          <img src="/assets/generated/brevyn-window.png" alt="Brevyn 桌面应用，展示学期工作区、课程列表和仪表盘面板。" />
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section className="band" id="product">
      <div className="content">
        <div className="split">
          <div>
            <p className="section-kicker">课程资料处理链路</p>
            <h2 className="section-title">把课程资料转成可检索、可引用的学习上下文。</h2>
            <p className="section-text">
              Brevyn 不把文件、课程和 AI 会话拆散处理。资料进入课程空间后，会围绕解析、索引、检索和任务会话形成一条连续工作流。
            </p>
            <div className="capability-rail" aria-label="Brevyn 能力标签">
              {capabilityTags.map((tag) => (
                <span className="capability-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="context-stack">
              {contextItems.map(([title, body]) => (
                <div className="context-item" key={title}>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="shot-frame">
            <img src="/assets/generated/brevyn-window.png" alt="Brevyn 创建学期并组织学习任务的引导界面。" />
          </div>
        </div>

        <div className="features" aria-label="Brevyn 核心功能">
          {features.map((feature) => (
            <article className={`feature${feature.wide ? " wide" : ""}`} key={feature.index}>
              <div className="index">{feature.index}</div>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
              <div className="feature-tags">
                {feature.tags.map((tag) => (
                  <span className="feature-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContextSection() {
  return (
    <section id="context">
      <div className="content">
        <p className="section-kicker">功能界面</p>
        <h2 className="section-title">课程、资料和任务，在同一套桌面界面里协作。</h2>
        <p className="section-text">
          Brevyn 的界面围绕课程空间设计：从创建课程、归档资料，到启动任务会话和追溯文件证据，都保留在同一个学习工作台里。
        </p>
        <div className="capability-rail" aria-label="产品演示能力标签">
          {contextTags.map((tag) => (
            <span className="capability-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="demo-strip" aria-label="Brevyn 产品界面截图">
          {demoCards.map((card) => (
            <article className="demo-card" key={card.title}>
              <img src={card.src} alt={card.alt} />
              <div className="demo-caption">
                <strong>{card.title}</strong>
                <span>{card.body}</span>
              </div>
              <div className="demo-tags" aria-label={`${card.title}能力标签`}>
                {card.tags.map((tag) => (
                  <span className="demo-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="band" id="trust">
      <div className="content">
        <p className="section-kicker">本地优先设计</p>
        <h2 className="section-title">你的课程工作区留在桌面上，持续保持结构。</h2>
        <p className="section-text">
          Brevyn 围绕本地工作区设计。Cloud 可以支持账号、套餐和模型能力，而课程结构和桌面操作始终清楚可见。
        </p>
        <div className="trust">
          {trustItems.map(([title, body]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSelector({ platform, onChange }: { platform: Platform; onChange: (platform: Platform) => void }) {
  return (
    <div className="download-platform-switch" role="tablist" aria-label="选择下载平台">
      <button type="button" role="tab" aria-selected={platform === "macos"} onClick={() => onChange("macos")}>
        <Apple aria-hidden="true" />
        macOS
      </button>
      <button type="button" role="tab" aria-selected={platform === "windows"} onClick={() => onChange("windows")}>
        <MonitorDown aria-hidden="true" />
        Windows
      </button>
    </div>
  );
}

function EditionDownload({
  edition,
  manifest,
  platform,
  loading,
}: {
  edition: "official" | "community";
  manifest: ReleaseManifest | null;
  platform: Platform;
  loading: boolean;
}) {
  const installer = findInstaller(manifest, platform);
  const isOfficial = edition === "official";
  const releaseUrl = isOfficial ? officialReleaseUrl : communityReleaseUrl;
  const version = manifest?.tag ?? "最新稳定版";

  return (
    <article className={`download-edition ${isOfficial ? "is-official" : "is-community"}`}>
      <div className="download-edition-copy">
        <div className="download-edition-title">
          <h3>Brevyn {isOfficial ? "Official" : "Community"}</h3>
          <span>{isOfficial ? "推荐" : "开源"}</span>
        </div>
        <p>{isOfficial ? "官方账号、模型服务与自动更新。" : "本地优先，自行配置 Agent、Embedding、Vision 与 OCR Provider。"}</p>
      </div>

      <div className="download-specs" aria-live="polite">
        <span>{version}</span>
        <span>{platformDetail(platform)}</span>
        {installer ? <span>{formatFileSize(installer.size)}</span> : null}
      </div>

      <div className="download-edition-actions">
        {installer ? (
          <a
            className={`button download-edition-primary${isOfficial ? " primary" : ""}`}
            href={installer.url}
            rel="noopener noreferrer"
          >
            <Download className="button-icon" aria-hidden="true" />
            下载 {isOfficial ? "Official" : "Community"}{platform === "macos" ? "（Apple Silicon）" : "（x64）"}
          </a>
        ) : (
          <button
            className={`button download-edition-primary${isOfficial ? " primary" : ""}`}
            type="button"
            disabled
            aria-busy={loading}
          >
            <Download className="button-icon" aria-hidden="true" />
            {loading ? "正在获取下载地址" : "下载地址暂不可用"}
          </button>
        )}
        <a className="download-text-link" href={isOfficial ? releaseUrl : communitySourceUrl} target="_blank" rel="noopener noreferrer">
          {isOfficial ? <GithubMark /> : <Code2 aria-hidden="true" />}
          {isOfficial ? "GitHub 备用" : "查看源码"}
        </a>
      </div>
    </article>
  );
}

function DownloadSection({
  catalog,
  platform,
  onPlatformChange,
}: {
  catalog: ReleaseCatalog;
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
}) {
  return (
    <section className="download-band" id="download">
      <div className="content download-content">
        <div className="download-header">
          <div>
            <p className="section-kicker">下载</p>
            <h2 className="section-title">从一门课开始。</h2>
            <p className="section-text">选择适合你的平台与版本，安装包由 Brevyn 下载节点直接提供。</p>
          </div>
          <PlatformSelector platform={platform} onChange={onPlatformChange} />
        </div>

        <div className="download-editions">
          <EditionDownload edition="official" manifest={catalog.official} platform={platform} loading={catalog.loading} />
          <EditionDownload edition="community" manifest={catalog.community} platform={platform} loading={catalog.loading} />
        </div>

        <p className="download-footnote">
          macOS 当前仅支持 Apple Silicon。GitHub Releases 保留为网络异常时的备用下载源。
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© 2026 Brevyn。本地优先的 AI 学习工作台。</span>
        <div className="footer-links">
          <a href="#product">产品</a>
          <a href="#trust">隐私</a>
          <a href="#download">下载</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("macos");
  const releaseCatalog = useReleaseCatalog();

  useEffect(() => setPlatform(detectPlatform()), []);

  return (
    <div className="page">
      <Header contactOpen={contactOpen} setContactOpen={setContactOpen} />
      <main id="top">
        <Hero pixelPaused={contactOpen} manifest={releaseCatalog.official} platform={platform} loading={releaseCatalog.loading} />
        <ProductSection />
        <ContextSection />
        <TrustSection />
        <DownloadSection catalog={releaseCatalog} platform={platform} onPlatformChange={setPlatform} />
      </main>
      <Footer />
    </div>
  );
}
