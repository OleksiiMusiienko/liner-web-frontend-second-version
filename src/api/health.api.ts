/**
 * Обеспечивает отправку запроса к Backend
 * для проверки работоспособности сервера.
 */

import { httpClient } from "@/api/httpClient";
import type { HealthResponse } from "@/types/health.types";

export async function getHealth(): Promise<HealthResponse> {
  const response = await httpClient.get<HealthResponse>("/health");

  return response.data;
}
