// vite.config.ts
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { patchCssModules } from "vite-css-modules";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3512,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({ customViteReactPlugin: true, target: "cloudflare-module" }),
    viteReact(),
    patchCssModules(),
    tailwindcss(),
  ],
});
