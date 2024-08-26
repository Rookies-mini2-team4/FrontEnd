import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],

  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/ws": "http://localhost:8080", // WebSocket 요청 프록시 설정
//     },
//   },
//   resolve: {
//     alias: {
//       process: "process/browser",
//       crypto: "crypto-browserify", // 추가된 부분
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: "globalThis",
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           buffer: true,
//         }),
//         NodeModulesPolyfillPlugin(),
//       ],
//     },
//   },
// });
