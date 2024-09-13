import { useEffect, useState } from "react";
import zoneImage from "../assets/zone.png";
import zoneSelectedImage from "../assets/zone-selected.png";
import zoneLockImage from "../assets/zone-lock.png";
import zoneLock2Image from "../assets/zone-lock2.png";
import zoneActiveImage from "../assets/zone-action.png";
import zoneWinImage from "../assets/zone-win.png";
import { useStore } from "../lib/useStore.ts";

export function ButtonsGrid() {
  const [activeBalls, setActiveBalls] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const selectedBalls = useStore((state) => state.selectedBalls);
  const setSelectedBalls = useStore((state) => state.setSelectedBalls);
  const isGameStarted = useStore((state) => state.isGameStarted);
  const balls = useStore((state) => state.numbers);

  const handleSelectChange = (number: number) => {
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
      className="grid grid-cols-10 gap-[.1rem] h-full"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
        <SelectBallButton
          isSelected={selectedBalls.includes(number)}
          isActive={activeBalls.includes(number)}
          isDisabled={isGameStarted}
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
  const [isFlipped, setIsFlipped] = useState(false); // отслеживаем, завершился ли поворот

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsFlipped(true); // Меняем картинку на 50% анимации (после 250мс из 500мс)
      }, 500);
    } else {
      setIsFlipped(false); // Сбрасываем картинку, если не активен
    }
  }, [isActive]);

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

  const isWin =
    isActive && tickets.flatMap((value) => value.balls).includes(number);

  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={handleSelectChange}
      className={`h-full text-[#e0e0e0] font-semibold bg-no-repeat bg-center bg-cover text-2xl ${isSelected ? "animation" : ""} ${isActive ? "drop-ball" : ""} ${isDisabled ? "cursor-default" : "cursor-pointer"}`}
      style={{
        backgroundImage: `url(${isFlipped ? (isWin ? zoneWinImage : zoneActiveImage) : backgroundImage})`,
      }}
    >
      {number}
    </button>
  );
}
