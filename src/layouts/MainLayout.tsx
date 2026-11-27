/**
 * Основная оболочка публичной части приложения FLAG.
 * Содержит общую навигацию, подвал и область отображения страниц.
 */

import { Link, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants/routes.constants";

export default function MainLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to={ROUTES.HOME}>FLAG</Link> <Link to={ROUTES.LOGIN}>Увійти</Link>{" "}
          <Link to={ROUTES.REGISTER}>Реєстрація</Link>
        </nav>
      </header>

      <Outlet />

      <footer>© FLAG</footer>
    </>
  );
}
