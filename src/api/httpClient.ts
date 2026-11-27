/**
 * Централизованный HTTP-клиент приложения Liner.
 * Содержит общие настройки HTTP-запросов
 * и регистрирует перехватчики ответов.
 */

import axios from "axios";

import { env } from "@/config/env";
import { registerErrorInterceptor } from "@/api/interceptors/error.interceptor";

export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

registerErrorInterceptor(httpClient);
