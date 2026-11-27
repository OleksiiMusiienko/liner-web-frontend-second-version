/**
 * Содержит централизованные адреса маршрутов приложения Liner.
 * Исключает дублирование путей в компонентах и конфигурации маршрутизации.
 */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
  DASHBOARD: "/dashboard",
  FORBIDDEN: "/403",
  NOT_FOUND: "*",
} as const;
