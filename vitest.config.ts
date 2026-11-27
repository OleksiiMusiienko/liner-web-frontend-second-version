/**
 * Конфигурация тестового окружения Frontend
 * и параметров покрытия кода тестами.
 */

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./tests/setup.ts"],
      include: ["tests/**/*.{test,spec}.{ts,tsx}"],

      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,tsx}"],
        reportsDirectory: "./coverage",
        reporter: ["text", "html"],
      },
    },
  }),
);
