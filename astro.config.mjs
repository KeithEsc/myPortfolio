import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["graphql-request"],
    },
  },
  integrations: [
    tailwind(), // Add React integration here
    react(),
    icon(),
  ],
});
