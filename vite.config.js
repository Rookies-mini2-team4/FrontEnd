import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// ES Modules에서 __dirname을 대체하기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // @를 src 폴더로 대체
    },
  },
  define: {
    global: 'window', // global을 window로 정의
  },
  server: {
    port: 3000, // 개발 서버 포트를 3000으로 설정
  },
});
