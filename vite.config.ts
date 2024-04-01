import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import MillionLint from "@million/lint";
import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), MillionLint.vite(), million.vite({ auto: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
