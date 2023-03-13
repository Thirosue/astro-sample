import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), react()],
  vite: {
    ssr: {
      // 例: 必要な場合、壊れたパッケージが SSR の処理を行うのをスキップさせます
      external: ["broken-npm-package"],
    },
  },
});
