import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "node18", // Node.js 18 환경에 맞춰 빌드
    rollupOptions: {
      output: {
        format: "cjs", // CommonJS로 설정 (Node.js 환경 호환성 강화)
      },
    },
  },
});
