import React, { useEffect, useState } from "react";
import buttonMenuImage from "../assets/btn-menu2-min.png";
import autoplayButton from "../assets/autoplay.png";
import autoplayPressedButton from "../assets/autoplay-pressed.png";
import autoplaySelectedButton from "../assets/autoplay-selected.png";
import plusButton from "../assets/plus.png";
import plusPressedButton from "../assets/plus-pressed.png";
import plusSelectedButton from "../assets/plus-selected.png";
import randomButton from "../assets/random.png";
import randomPressedButton from "../assets/random-pressed.png";
import randomSelectedButton from "../assets/random-selected.png";
import randomNumButton from "../assets/random-num.png";
import randomNumPressedButton from "../assets/random-num-pressed.png";
import randomNumSelectedButton from "../assets/random-num-selected.png";
import infoToggleButton from "../assets/btn-info.png";
// import infoToggleSelectedButton from "../assets/btn-info-mode-selected.png";
import buttonUndo from "../assets/btn-undo.png";
// import buttonUndoPressed from "../assets/btn-undo-mode-selected.png";
import buttonRebetMin from "../assets/btn-rebet-min.png";
// import buttonRebetMinSelected from "../assets/btn-rebet-mode-selected-min.png";
import buttonRebetX2 from "../assets/btn-rebetx2-min.png";
// import buttonRebetX2Selected from "../assets/btn-rebetx2-mode-selected-min.png";
import { useStore } from "../lib/useStore.ts";

export function GameControlPanel() {
  const [randomCount, setRandomCount] = useState(1);
  const selectedBalls = useStore((state) => state.selectedBalls);
  const setSelectedBalls = useStore((state) => state.setSelectedBalls);
  const tickets = useStore((state) => state.tickets);
  const addTicket = useStore((state) => state.addTicket);
  const isGameStarted = useStore((state) => state.isGameStarted);

  const handleTicketAdd = () => {
    if (selectedBalls.length === 0) return;
    addTicket({
      balls: selectedBalls,
      bet: 1,
      multiplier: 1,
      win: 0,
    });
    setSelectedBalls([]);
  };

  const handleRandomAdd = () => {
    if (isGameStarted) return;
    const result: number[] = [];
    for (let i = 0; i < randomCount; i++) {
      result.push(Math.floor(Math.random() * 80) + 1);
    }

    addTicket({
      balls: result,
      bet: 1,
      multiplier: 1,
      win: 0,
    });
  };

  useEffect(() => {
    console.log(tickets);
  }, [tickets]);

  return (
    <div className="grid grid-cols-3 bg-black/20 h-[5rem] max-h-[5rem] px-6 mt-10 items-center gap-8">
      <div className="flex gap-8 items-center">
        <img src={buttonMenuImage} className="w-7 h-4" />
        <img src={infoToggleButton} className="h-7" />
        <div className="flex flex-col items-center">
          <img src={buttonUndo} className="h-6 mb-1" />
          <span className="text-[.5rem]">Отменить</span>
        </div>
        <div className="flex gap-8 items-center">
          <span>{"<"}</span>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">1</span>
            <span className="text-[.5rem]">ставка</span>
          </div>
          <span>{">"}</span>
        </div>
      </div>

      <div className="flex justify-center items-center h-full w-full relative">
        <ControlButton
          onClick={() => 0}
          activeImage={autoplayPressedButton}
          defaultImage={autoplayButton}
          selectedImage={autoplaySelectedButton}
          className="left-0"
        >
          Автоигра
        </ControlButton>
        <PlusButton onClick={handleTicketAdd} />
        <ControlButton
          onClick={handleRandomAdd}
          activeImage={randomPressedButton}
          defaultImage={randomButton}
          selectedImage={randomSelectedButton}
        >
          Случайно
        </ControlButton>
        <ControlButton
          onClick={() => {
            setRandomCount(randomCount < 10 ? randomCount + 1 : 1);
          }}
          className="left-1/2 -translate-x-1/2"
          activeImage={randomNumPressedButton}
          defaultImage={randomNumButton}
          selectedImage={randomNumSelectedButton}
        >
          {randomCount}
        </ControlButton>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center">
          <img src={buttonRebetMin} className="h-6 mb-1" />
          <span className="text-[.5rem]">Повторить</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={buttonRebetX2} className="h-6 mb-1" />
          <span className="text-[.5rem]">Повтор x2</span>
        </div>
      </div>
    </div>
  );
}

function PlusButton({ onClick }: { onClick: () => void }) {
  const [backgroundImage, setBackgroundImage] = useState(plusButton);
  const onMouseOut = () => {
    setBackgroundImage(plusButton);
  };
  const onMouseOver = () => {
    setBackgroundImage(plusSelectedButton);
  };
  const onMouseDown = () => {
    setBackgroundImage(plusPressedButton);
  };
  const onMouseUp = () => {
    setBackgroundImage(plusButton);
    onClick();
  };
  return (
    <button
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
      className="absolute bottom-0 z-40"
    >
      <img src={backgroundImage} className="h-20" />
    </button>
  );
}

interface ControlButtonProps {
  defaultImage: string;
  activeImage: string;
  selectedImage: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

function ControlButton({
  defaultImage,
  selectedImage,
  activeImage,
  onClick,
  className,
  children,
}: ControlButtonProps) {
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);
  const onMouseOut = () => {
    setBackgroundImage(defaultImage);
  };
  const onMouseOver = () => {
    setBackgroundImage(selectedImage);
  };
  const onMouseDown = () => {
    setBackgroundImage(activeImage);
  };
  const onMouseUp = () => {
    setBackgroundImage(defaultImage);
    onClick();
  };
  return (
    <button
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
      className="relative"
    >
      <img src={backgroundImage} className="h-14" />
      <span
        className={`absolute text-black top-1/2 right-1 -translate-y-1/2 text-sm uppercase font-semibold ${className}`}
      >
        {children}
      </span>
    </button>
  );
}
