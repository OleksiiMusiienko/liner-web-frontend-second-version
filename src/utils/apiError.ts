/**
 * Приводит ошибки Backend, Axios и сетевые ошибки
 * к единому формату ApiError.
 */

import axios from "axios";

import type { ApiError } from "@/types/api.types";

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError<unknown>(error)) {
    const data = error.response?.data;

    if (typeof data === "object" && data !== null) {
      return {
        statusCode: error.response?.status ?? null,
        message:
          "message" in data && typeof data.message === "string" ? data.message : error.message,
        code: "code" in data && typeof data.code === "string" ? data.code : null,
      };
    }

    return {
      statusCode: error.response?.status ?? null,
      message: error.message,
      code: error.code ?? null,
    };
  }

  return {
    statusCode: null,
    message: error instanceof Error ? error.message : "Unknown error",
    code: null,
  };
}
