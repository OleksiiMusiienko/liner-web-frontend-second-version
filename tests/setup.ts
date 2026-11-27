/**
 * Подготовка тестового окружения
 * перед выполнением тестов Frontend.
 */

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
