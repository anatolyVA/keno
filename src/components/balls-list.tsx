import { useEffect, useState } from "react";
import ballImage from "../assets/ball.png";
import { useStore } from "../lib/useStore.ts";
import { Logo } from "./logo.tsx";
import ballCollision from "../assets/sounds/ballCollision.mp3";

export function BallsList() {
  const balls = useStore((state) => state.numbers);
  const [historyCount, setHistoryCount] = useState(800000);
  const addToHistory = useStore((state) => state.addToHistory);
  const [activeBalls, setActiveBalls] = useState<number[]>([]);
  const collision = new Audio(ballCollision);
  const isGameStarting = useStore((state) => state.isGameStarting);
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
          setHistoryCount((prev) => prev + 1);
          addToHistory({
            count: historyCount,
            balls: balls,
          });
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [balls]);

  return (
    <div className="grid grid-cols-[1fr_7fr] pt-3 pl-1.5 cursor-default font-avita">
      <div className="flex flex-col items-center whitespace-nowrap gap-2">
        <Logo />
        <span className="text-[#fa9a00] font-semibold">#{historyCount}</span>
      </div>
      <ul className="flex gap-[.1rem] rounded-l-full items-center pt-0.5 mb-2 overflow-hidden">
        {activeBalls.map((number) => (
          <Ball
            sound={collision}
            key={number}
            number={number}
            isActive={activeBalls.includes(number)}
            isGameStarting={isGameStarting}
          />
        ))}
      </ul>
    </div>
  );
}

function Ball({
  number,
  isActive,
  sound,
  isGameStarting,
}: {
  sound: HTMLAudioElement;
  number: number;
  isActive: boolean;
  isGameStarting: boolean;
}) {
  const isAppMuted = useStore((state) => state.isAppMuted);

  useEffect(() => {
    if (isAppMuted) return;
    if (isActive) {
      const timeout = setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      sound.pause();
      sound.currentTime = 0;
    }
  }, [isActive, isAppMuted]);

  return (
    <li
      className={`h-full overflow-hidden aspect-square bg-center bg-cover bg-no-repeat rounded-full p-1.5 ${
        isActive ? "sliding-element" : ""
      } ${isGameStarting ? "sliding-element-left" : ""}`}
      style={{
        backgroundImage: `url(${ballImage})`,
      }}
    >
      <span
        className={`text-black font-avita text-lg font-semibold w-full h-full flex justify-center items-center ${
          isActive ? "rotating-element" : ""
        } ${isGameStarting ? "rotating-element-left" : ""}`}
      >
        {number}
      </span>
    </li>
  );
}
