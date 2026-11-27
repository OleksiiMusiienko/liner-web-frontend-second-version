/**
 * Тесты перехватчика HTTP-ответов Axios.
 * Проверяют передачу успешных ответов без изменений
 * и автоматическую нормализацию ошибок.
 */

import { describe, it, expect } from "vitest";
import axios, { AxiosError } from "axios";

import { registerErrorInterceptor } from "@/api/interceptors/error.interceptor";

describe("registerErrorInterceptor", () => {
  it("returns successful responses unchanged", async () => {
    const client = axios.create({
      adapter: async (config) => ({
        data: { status: "ok" },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      }),
    });

    registerErrorInterceptor(client);

    const response = await client.get("/health");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ status: "ok" });
  });

  it("normalizes backend errors", async () => {
    const client = axios.create({
      adapter: async (config) => {
        throw new AxiosError("Request failed", "ERR_BAD_REQUEST", config, undefined, {
          data: {
            statusCode: 400,
            code: "TEST_ERROR",
            message: "Invalid request",
          },
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config,
        });
      },
    });

    registerErrorInterceptor(client);

    await expect(client.get("/test")).rejects.toEqual({
      statusCode: 400,
      code: "TEST_ERROR",
      message: "Invalid request",
    });
  });

  it("normalizes network errors", async () => {
    const client = axios.create({
      adapter: async () => {
        throw new AxiosError("Network Error", "ERR_NETWORK");
      },
    });

    registerErrorInterceptor(client);

    await expect(client.get("/health")).rejects.toEqual({
      statusCode: null,
      code: "ERR_NETWORK",
      message: "Network Error",
    });
  });
});
