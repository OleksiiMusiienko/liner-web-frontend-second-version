/**
 * Централизованная конфигурация маршрутизации Liner.
 * Определяет маршруты, их вложенность и общие оболочки страниц.
 */

import { Routes, Route } from "react-router-dom";

import { ROUTES } from "@/constants/routes.constants";

import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/public/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
