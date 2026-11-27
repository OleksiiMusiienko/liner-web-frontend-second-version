/**
 * Главная публичная страница приложения Liner.
 * Временно отображает состояние соединения с Backend.
 */

import { useHealth } from "@/hooks/useHealth";

export default function HomePage() {
  const { data, isPending, isError } = useHealth();

  return (
    <main>
      <h1>Liner</h1>
      <p>Музична стримінгова платформа</p>

      {isPending && <p>Підключення до сервера...</p>}

      {isError && <p>Помилка підключення до сервера</p>}

      {data && <p>Backend status: {data.status}</p>}
    </main>
  );
}
