import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// ES Modules에서 __dirname을 대체하기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), nodePolyfills],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // @를 src 폴더로 대체
      util: "rollup-plugin-node-polyfills/polyfills/util",
      assert: "rollup-plugin-node-polyfills/polyfills/assert",
      os: "rollup-plugin-node-polyfills/polyfills/os",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      fs: "rollup-plugin-node-polyfills/polyfills/empty",
      net: "rollup-plugin-node-polyfills/polyfills/empty",
      perf_hooks: "rollup-plugin-node-polyfills/polyfills/empty",
      path: "rollup-plugin-node-polyfills/polyfills/path",
      child_process: "rollup-plugin-node-polyfills/polyfills/empty",
    },
  },
  define: {
    global: "window", // global을 window로 정의
  },
  server: {
    port: 3000, // 개발 서버 포트를 3000으로 설정
  },
});
