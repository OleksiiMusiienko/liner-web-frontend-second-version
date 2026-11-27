/**
 * Определяет типы ошибок Backend API
 * и единый формат обработки ошибок на Frontend.
 */

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  code?: string;
  error?: string;
}

export interface ApiError {
  statusCode: number | null;
  message: string;
  code: string | null;
}
