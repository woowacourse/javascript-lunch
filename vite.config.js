import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    AutoImport({
      include: [/src\/components\/.+\.js$/],

      imports: [
        {
          "@/utils/dom.js": ["createElement"],
        },
      ],

      dirs: ["src/components"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
