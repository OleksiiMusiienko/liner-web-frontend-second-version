/**
 * Объединяет глобальные провайдеры приложения
 * и предоставляет их функциональность дочерним компонентам.
 */

import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/config/queryClient";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
}
