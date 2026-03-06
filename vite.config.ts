// vite.config.ts
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { patchCssModules } from "vite-css-modules";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { sitemapPlugin } from '@corentints/tanstack-router-sitemap';

export default defineConfig({
  server: {
    port: 3512,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    sitemapPlugin({
        baseUrl: 'https://bijalapa.com',
        outputPath: "public/sitemap.xml",
        verbose: true,
      }),
    viteReact(),
    patchCssModules(),
    tailwindcss(),
  ],
});
