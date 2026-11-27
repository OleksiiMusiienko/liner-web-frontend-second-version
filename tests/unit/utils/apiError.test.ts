/**
 * Модульные тесты нормализации ошибок API.
 * Проверяют преобразование ошибок Backend, Axios,
 * сетевых и неизвестных ошибок в единый формат.
 */

import { describe, it, expect } from "vitest";
import { AxiosError } from "axios";

import { normalizeApiError } from "@/utils/apiError";

describe("normalizeApiError", () => {
  it("normalizes application errors", () => {
    const error = {
      isAxiosError: true,
      message: "Request failed",
      response: {
        status: 409,
        data: {
          statusCode: 409,
          code: "TEST_CONFLICT",
          message: "Conflict",
        },
      },
    };

    expect(normalizeApiError(error)).toEqual({
      statusCode: 409,
      code: "TEST_CONFLICT",
      message: "Conflict",
    });
  });

  it("normalizes standard Fastify errors", () => {
    const error = {
      isAxiosError: true,
      message: "Request failed",
      response: {
        status: 404,
        data: {
          statusCode: 404,
          error: "Not Found",
          message: "Route not found",
        },
      },
    };

    expect(normalizeApiError(error)).toEqual({
      statusCode: 404,
      code: null,
      message: "Route not found",
    });
  });

  it("normalizes network errors", () => {
    const error = new AxiosError("Network Error", "ERR_NETWORK");

    expect(normalizeApiError(error)).toEqual({
      statusCode: null,
      code: "ERR_NETWORK",
      message: "Network Error",
    });
  });

  it("normalizes timeout errors", () => {
    const error = new AxiosError("Request timeout", "ECONNABORTED");

    expect(normalizeApiError(error)).toEqual({
      statusCode: null,
      code: "ECONNABORTED",
      message: "Request timeout",
    });
  });

  it("normalizes standard JavaScript errors", () => {
    const error = new Error("Unexpected error");

    expect(normalizeApiError(error)).toEqual({
      statusCode: null,
      code: null,
      message: "Unexpected error",
    });
  });

  it("normalizes unknown errors", () => {
    expect(normalizeApiError(null)).toEqual({
      statusCode: null,
      code: null,
      message: "Unknown error",
    });
  });
});
