/**
 * Интеграционные тесты приложения Liner.
 * Проверяют маршрутизацию, навигацию
 * и отображение данных, полученных от Backend.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "@/App";
import { ROUTES } from "@/constants/routes.constants";

vi.mock("@/api/health.api", () => ({
  getHealth: vi.fn().mockResolvedValue({ status: "ok" }),
}));

function renderApp(path: string = ROUTES.HOME) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

  return render(
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the home page", async () => {
    renderApp();

    expect(screen.getByRole("heading", { name: "Liner" })).toBeInTheDocument();

    expect(await screen.findByText("Backend status: ok")).toBeInTheDocument();
  });

  it("renders the login page", () => {
    renderApp(ROUTES.LOGIN);

    expect(screen.getByRole("heading", { name: "Вхід" })).toBeInTheDocument();
  });

  it("renders the registration page", () => {
    renderApp(ROUTES.REGISTER);

    expect(screen.getByRole("heading", { name: "Реєстрація" })).toBeInTheDocument();
  });

  it("renders the not found page", () => {
    renderApp("/unknown");

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
  });

  it("navigates from home to login", async () => {
    const user = userEvent.setup();

    renderApp();

    await user.click(screen.getByRole("link", { name: "Увійти" }));

    expect(await screen.findByRole("heading", { name: "Вхід" })).toBeInTheDocument();
  });
});
