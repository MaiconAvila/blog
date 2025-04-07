import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "vite-plugin-mdx-to-json",
      transform(src, id) {
        if (id.endsWith(".mdx")) {
          const { data, content } = matter(src);
          return {
            code: `export default ${JSON.stringify({ frontmatter: data, content })}`,
            map: null,
          };
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
