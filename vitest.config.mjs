import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["src/core/**/*.{test,spec,bench}.ts"], 
  },
});
