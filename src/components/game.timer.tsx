//import { useState } from "react";

import { useEffect, useState } from "react";
import { useStore } from "../lib/useStore.ts";

export function GameTimer({ seconds }: { seconds: number }) {
  const generateRandomNumbers = useStore(
    (state) => state.generateRandomNumbers,
  );
  const clearTickets = useStore((state) => state.clearTickets);
  const setIsGameStarted = useStore((state) => state.setIsGameStarted);
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 0.1 : 0));
      }, 100);
      return () => clearInterval(interval);
    } else {
      generateRandomNumbers();
      setIsGameStarted(true);
      const timeout = setTimeout(() => {
        clearTickets();
        setIsGameStarted(false);
        setTimer(seconds); // Сбрасываем таймер обратно через 10 секунд
      }, 25000); // 10000 миллисекунд = 10 секунд

      return () => clearTimeout(timeout); // Очищаем timeout при размонтировании
    }
  }, [timer, seconds]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds.toFixed()}`;
  };

  return (
    <div className="h-[1.1rem] top-[4.31rem] overflow-hidden absolute w-full bg-black p-0.5">
      <div
        className="h-full max-w-full"
        style={{
          backgroundColor: timer <= 0 ? "#bf372d" : "#00a651",
          width: `${((seconds - timer) / seconds) * 100}%`,
        }}
      ></div>
      {timer > 0 && (
        <span className="absolute top-0.5 right-1/2 translate-x-1/2 text-[0.5rem] font-medium uppercase">
          Делайте ваши ставки
        </span>
      )}
      <span className="absolute bottom-[0rem] right-0 text-xs mr-8">
        {timer > 0 ? formatTime(timer) : "00:00"}
      </span>
    </div>
  );
}
