//import { useState } from "react";

import { useEffect, useState } from "react";
import { useStore } from "../lib/useStore.ts";

export function GameTimer({ seconds }: { seconds: number }) {
  const generateRandomNumbers = useStore(
    (state) => state.generateRandomNumbers,
  );
  const clearTickets = useStore((state) => state.clearTickets);
  const setIsGameStarted = useStore((state) => state.setIsGameStarted);
  const setIsGameStarting = useStore((state) => state.setIsGameStarting);
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 0.1 : 0));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setIsGameStarting(true);
      setIsGameStarted(true);
      const delayTimeout = setTimeout(() => {
        setIsGameStarting(false);
        generateRandomNumbers(); // Генерация чисел после задержки

        // Таймер для завершения игры
        const timeout = setTimeout(() => {
          clearTickets();
          setIsGameStarted(false);
          setTimer(seconds); // Перезапуск таймера
        }, 25000);

        return () => clearTimeout(timeout); // Очищаем timeout при размонтировании
      }, 2000); // Задержка 2 секунды

      return () => clearTimeout(delayTimeout); // Очищаем timeout при размонтировании
    }
  }, [timer, seconds]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds.toFixed()}`;
  };

  return (
    <div className="h-[1.1rem] top-[calc(100%-1.3rem-1.1rem)] overflow-hidden absolute w-full bg-black p-0.5">
      <div
        className="h-full max-w-full"
        style={{
          backgroundColor: timer <= 0 ? "#bf372d" : "#00a651",
          width: `${((seconds - timer) / seconds) * 100}%`,
        }}
      ></div>
      {timer > 0 && (
        <span className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-[0.5rem] font-medium uppercase">
          Делайте ваши ставки
        </span>
      )}
      <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xs mr-8">
        {timer > 0 ? formatTime(timer) : "00:00"}
      </span>
    </div>
  );
}
