/**
 * Создаёт и настраивает глобальный клиент TanStack Query
 * для управления серверными данными и кешированием.
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
