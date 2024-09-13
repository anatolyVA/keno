import { useEffect, useState } from "react";
import ballImage from "../assets/ball.png";
import { useStore } from "../lib/useStore.ts";
import { Logo } from "./logo.tsx";

export function BallsList() {
  const balls = useStore((state) => state.numbers);
  const addToHistory = useStore((state) => state.addToHistory);
  const [activeBalls, setActiveBalls] = useState<number[]>([]);
  const addToGlobalActiveBalls = useStore(
    (state) => state.addToGlobalActiveBalls,
  );
  const clearGlobalActiveBalls = useStore(
    (state) => state.clearGlobalActiveBalls,
  );

  useEffect(() => {
    setActiveBalls([]);
    clearGlobalActiveBalls();
    if (balls.length === 0) return;
    let index = 0;

    const interval = setInterval(() => {
      setActiveBalls((prev) => {
        if (index < balls.length) {
          const newActiveBalls = [...prev, balls[index]];
          addToGlobalActiveBalls(balls[index]);
          index++;
          return newActiveBalls;
        } else {
          clearInterval(interval);
          addToHistory({
            count: Date.now(),
            balls: balls,
          });
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [balls]);

  return (
    <div className="grid grid-cols-[1fr_7fr] pt-2.5 pl-2.5 cursor-default">
      <div className="flex flex-col items-center whitespace-nowrap gap-2">
        <Logo />
        <span className="text-[#fa9a00]">#804970</span>
      </div>
      <ul className="flex gap-[.1rem] rounded-l-full items-center py-1 mb-1 overflow-hidden">
        {activeBalls.map((number) => (
          <Ball
            key={number}
            number={number}
            isActive={activeBalls.includes(number)}
          />
        ))}
      </ul>
    </div>
  );
}

function Ball({ number, isActive }: { number: number; isActive: boolean }) {
  return (
    <li
      className={`h-full overflow-hidden aspect-square bg-center bg-cover bg-no-repeat rounded-full p-1.5 ${
        isActive ? "sliding-element" : ""
      }`}
      style={{
        backgroundImage: `url(${ballImage})`,
      }}
    >
      <span
        className={`text-black text-lg font-semibold w-full h-full flex justify-center items-center ${
          isActive ? "rotating-element" : ""
        }`}
      >
        {number}
      </span>
    </li>
  );
}
