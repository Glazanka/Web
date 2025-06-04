// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",               // корен на проекта
  publicDir: "public",     // папката с index.html и assets
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
});
