import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@matrixsim/math-engine": fileURLToPath(
        new URL("./src/core/math-engine/index.ts", import.meta.url),
      ),
      "@matrixsim/sbl": fileURLToPath(
        new URL("./src/core/standard-block-libraries/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    globals: true,
    include: ["src/core/**/*.{test,spec,bench}.ts"],
  },
});
