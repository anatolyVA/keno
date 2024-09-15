import { useEffect, useState } from "react";
import zoneImage from "../assets/zone.png";
import zoneSelectedImage from "../assets/zone-selected.png";
import zoneLockImage from "../assets/zone-lock.png";
import zoneLock2Image from "../assets/zone-lock2.png";
import zoneActiveImage from "../assets/zone-action.png";
import zoneWinImage from "../assets/zone-win.png";
import firstChip from "../assets/sounds/firstChip.mp3";
import { useStore } from "../lib/useStore.ts";
import { cold, hot } from "./stats.tsx";

export function ButtonsGrid() {
  const [activeBalls, setActiveBalls] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const isAppMuted = useStore((state) => state.isAppMuted);
  const audio = new Audio(firstChip);
  const selectedBalls = useStore((state) => state.selectedBalls);
  const setSelectedBalls = useStore((state) => state.setSelectedBalls);
  const isGameStarted = useStore((state) => state.isGameStarted);
  const isGameStarting = useStore((state) => state.isGameStarting);
  const balls = useStore((state) => state.numbers);

  const handleSelectChange = (number: number) => {
    if (audio && !isAppMuted) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    if (selectedBalls.includes(number)) {
      setSelectedBalls(selectedBalls.filter((n) => n !== number));
    } else {
      if (selectedBalls.length >= 10) return;
      setSelectedBalls([...selectedBalls, number]);
    }
  };

  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);

  useEffect(() => {
    setActiveBalls([]);
    if (balls.length === 0) return;
    setSelectedBalls([]);
    let index = 0;

    const interval = setInterval(() => {
      setActiveBalls((prev) => {
        if (index < balls.length) {
          const newActiveBalls = [...prev, balls[index]];
          index++;
          return newActiveBalls;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [balls]);

  useEffect(() => {
    if (!isGameStarted) {
      setActiveBalls([]);
    }
  }, [isGameStarted]);

  return (
    <div
      className="grid grid-cols-10 gap-[.1rem] h-full font-avita"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
        <SelectBallButton
          isSelected={selectedBalls.includes(number)}
          isActive={activeBalls.includes(number)}
          isDisabled={isGameStarted || isGameStarting}
          onSelect={handleSelectChange}
          isMouseDown={isMouseDown}
          key={number}
          number={number}
        />
      ))}
    </div>
  );
}

function SelectBallButton({
  number,
  isSelected,
  isDisabled,
  onSelect,
  isActive,
  isMouseDown,
}: {
  number: number;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (number: number) => void;
  isActive: boolean;
  isMouseDown: boolean;
}) {
  const tickets = useStore((state) => state.tickets);
  const [backgroundImage, setBackgroundImage] = useState(zoneImage);
  const [isHalfFlipped, setIsHalfFlipped] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsHalfFlipped(true);
      }, 500);
    } else {
      setIsHalfFlipped(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isHalfFlipped) {
      setTimeout(() => {
        setIsFlipped(true);
      }, 500);
    } else {
      setIsFlipped(false);
    }
  }, [isHalfFlipped]);

  const countInTickets = tickets.filter((ticket) =>
    ticket.balls.includes(number),
  ).length;

  useEffect(() => {
    if (isDisabled || !isSelected)
      setBackgroundImage(
        countInTickets > 0
          ? countInTickets > 1
            ? zoneLock2Image
            : zoneLockImage
          : zoneImage,
      );
  }, [isDisabled, isSelected, tickets]);

  const onMouseOver = () => {
    if (isDisabled) return;
    if (isMouseDown) {
      onSelect(number); // Выбор шарика при движении курсора с зажатой кнопкой
    }
    setBackgroundImage(zoneSelectedImage);
  };
  const onMouseOut = () => {
    if (isSelected || isDisabled) return;
    setBackgroundImage(
      countInTickets > 0
        ? countInTickets > 1
          ? zoneLock2Image
          : zoneLockImage
        : zoneImage,
    );
  };
  const handleSelectChange = () => {
    if (isDisabled) return;
    onSelect(number);
  };

  const isHot = hot.flatMap((stat) => stat.number).includes(number);
  const isCold = cold.flatMap((stat) => stat.number).includes(number);
  const showHotCold = useStore((state) => state.showHotCold);

  const isWin =
    isActive && tickets.flatMap((value) => value.balls).includes(number);

  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={handleSelectChange}
      className={`h-full outlined-text ${showHotCold ? (isHot ? "text-[#ff5050]" : isCold ? "text-[#41a0ff]" : "text-white") : "text-white"} font-semibold bg-no-repeat bg-center bg-cover text-2xl ${isSelected && !isDisabled ? "animation" : ""} ${isActive && !isFlipped ? "drop-ball" : ""} ${isDisabled ? "cursor-default" : "cursor-pointer"}`}
      style={{
        backgroundImage: `url(${isHalfFlipped ? (isWin ? zoneWinImage : zoneActiveImage) : backgroundImage})`,
      }}
    >
      {number}
    </button>
  );
}
