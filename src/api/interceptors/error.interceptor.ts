/**
 * Регистрирует перехватчик HTTP-ответов Axios.
 * Передаёт успешные ответы без изменений,
 * а ошибки приводит к единому формату ApiError.
 */

import type { AxiosInstance } from "axios";

import { normalizeApiError } from "@/utils/apiError";

export function registerErrorInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      return Promise.reject(normalizeApiError(error));
    },
  );
}
