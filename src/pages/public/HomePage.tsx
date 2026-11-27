/**
 * Главная публичная страница приложения FLAG.
 * Временно отображает состояние соединения с Backend.
 */

import { useHealth } from "@/hooks/useHealth";

export default function HomePage() {
  const { data, isPending, isError } = useHealth();

  return (
    <main>
      <h1>FLAG</h1>
      <p>Облік гаражних кооперативів</p>

      {isPending && <p>Підключення до сервера...</p>}

      {isError && <p>Помилка підключення до сервера</p>}

      {data && <p>Backend status: {data.status}</p>}
    </main>
  );
}
