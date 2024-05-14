import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
const outDir = resolve(__dirname, "docs");

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
