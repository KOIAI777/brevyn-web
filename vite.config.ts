import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  assetsInclude: ["**/*.glb"],
  plugins: [react()],
  server: {
    proxy: {
      "/api/releases/official": {
        target: "https://download.brevyn.org",
        changeOrigin: true,
        rewrite: () => "/official/stable/release.json",
      },
      "/api/releases/community": {
        target: "https://community-download.brevyn.org",
        changeOrigin: true,
        rewrite: () => "/community/stable/release.json",
      },
    },
  },
});
