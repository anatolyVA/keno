import React, { useState } from "react";
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
//import infoToggleSelectedButton from "../assets/btn-info-mode-selected.png";
import buttonUndo from "../assets/btn-undo.png";
// import buttonUndoPressed from "../assets/btn-undo-mode-selected.png";
import buttonRebetMin from "../assets/btn-rebet-min.png";
// import buttonRebetMinSelected from "../assets/btn-rebet-mode-selected-min.png";
import buttonRebetX2 from "../assets/btn-rebetx2-min.png";
// import buttonRebetX2Selected from "../assets/btn-rebetx2-mode-selected-min.png";
import { useStore } from "../lib/useStore.ts";
import btnClick from "../assets/sounds/buttonClick.mp3";
import btnCross from "../assets/btn-cross-min.png";
import clearBet from "../assets/sounds/clearBet.mp3";
import arrow from "../assets/arrow.png";
//import arrowSelected from "../assets/arrow-selected.png";

export function GameControlPanel({
  onInfoToggle,
  isMenuOpen: isMenuOpenInit,
  onOpenMenu,
}: {
  onInfoToggle: () => void;
  isMenuOpen: boolean | null;
  onOpenMenu: (state: boolean) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(isMenuOpenInit);
  const [randomCount, setRandomCount] = useState(1);
  const isAppMuted = useStore((state) => state.isAppMuted);
  const selectedBalls = useStore((state) => state.selectedBalls);
  const setSelectedBalls = useStore((state) => state.setSelectedBalls);
  const audio = new Audio(btnClick);
  const clear = new Audio(clearBet);
  const setTickets = useStore((state) => state.setTickets);
  const addTicket = useStore((state) => state.addTicket);
  const isGameStarted = useStore((state) => state.isGameStarted);
  const isGameStarting = useStore((state) => state.isGameStarting);
  const prevTickets = useStore((state) => state.prevTickets);

  const playClickSound = () => {
    if (audio && !isAppMuted) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  };

  const handleInfoToggle = () => {
    onInfoToggle();
    playClickSound();
  };

  const handleTicketAdd = () => {
    playClickSound();
    if (selectedBalls.length === 0) return;
    addTicket({
      balls: selectedBalls,
      bet: 1,
      multiplier: 1,
      win: 0,
    });
    setSelectedBalls([]);
  };

  const handleMenuOpen = () => {
    playClickSound();
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onOpenMenu(newState);
  };

  const handleRandomAdd = () => {
    if (isGameStarted) return;
    playClickSound();
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

  const handleRepeatBet = () => {
    if (isGameStarted || prevTickets.length === 0) return;
    playClickSound();
    setTickets(prevTickets);
  };

  const handleClearClick = () => {
    if (isGameStarted) return;
    if (clear && !isAppMuted) {
      clear.pause();
      clear.currentTime = 0;
      clear.play();
    }
    setSelectedBalls([]);
  };
  return (
    <div className="grid grid-cols-3 bg-black/20 h-[5rem] max-h-[5rem] pr-6 mt-10 items-center gap-8">
      <div className="flex gap-6 items-center">
        <button
          onClick={handleMenuOpen}
          className="flex items-center justify-center min-w-[4.6rem] cursor-pointer"
        >
          <img
            src={isMenuOpen ? btnCross : buttonMenuImage}
            className={`h-4 relative z-[55] ${isMenuOpen ? "h-5" : ""}`}
          />
        </button>
        <img
          onClick={handleInfoToggle}
          src={infoToggleButton}
          className={`h-8 hover:opacity-80 cursor-pointer`}
        />
        <div className="flex flex-col items-center" onClick={handleClearClick}>
          <img src={buttonUndo} className="h-5 mb-1 cursor-pointer" />
          <span className="text-[.5rem]">Отменить</span>
        </div>
        <BetCounter />
      </div>

      <div className="flex justify-center items-center h-full w-full relative">
        <ControlButton
          isDisabled={isGameStarted || isGameStarting}
          onClick={playClickSound}
          activeImage={autoplayPressedButton}
          defaultImage={autoplayButton}
          selectedImage={autoplaySelectedButton}
          className="left-8"
        >
          Автоигра
        </ControlButton>
        <PlusButton
          isDisabled={isGameStarted || isGameStarting}
          onClick={handleTicketAdd}
        />
        <ControlButton
          isDisabled={isGameStarted || isGameStarting}
          onClick={handleRandomAdd}
          activeImage={randomPressedButton}
          defaultImage={randomButton}
          selectedImage={randomSelectedButton}
        >
          Случайно
        </ControlButton>
        <ControlButton
          isDisabled={isGameStarted || isGameStarting}
          onClick={() => {
            playClickSound();
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
        <button
          className="flex flex-col items-center"
          onClick={handleRepeatBet}
        >
          <img src={buttonRebetMin} className="h-6 mb-1" />
          <span className="text-[.5rem]">Повторить</span>
        </button>
        <div className="flex flex-col items-center">
          <img src={buttonRebetX2} className="h-6 mb-1" />
          <span className="text-[.5rem]">Повтор x2</span>
        </div>
      </div>
    </div>
  );
}

function PlusButton({
  onClick,
  isDisabled,
}: {
  onClick: () => void;
  isDisabled?: boolean;
}) {
  const [backgroundImage, setBackgroundImage] = useState(plusButton);
  const onMouseOut = () => {
    if (isDisabled) return;
    setBackgroundImage(plusButton);
  };
  const onMouseOver = () => {
    if (isDisabled) return;
    setBackgroundImage(plusSelectedButton);
  };
  const onMouseDown = () => {
    if (isDisabled) return;
    setBackgroundImage(plusPressedButton);
  };
  const onMouseUp = () => {
    if (isDisabled) return;
    setBackgroundImage(plusButton);
    onClick();
  };
  return (
    <button
      disabled={isDisabled}
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
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function ControlButton({
  defaultImage,
  selectedImage,
  activeImage,
  onClick,
  isDisabled,
  className,
  children,
}: ControlButtonProps) {
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);
  const onMouseOut = () => {
    if (isDisabled) return;
    setBackgroundImage(defaultImage);
  };
  const onMouseOver = () => {
    if (isDisabled) return;
    setBackgroundImage(selectedImage);
  };
  const onMouseDown = () => {
    if (isDisabled) return;
    setBackgroundImage(activeImage);
  };
  const onMouseUp = () => {
    if (isDisabled) return;
    setBackgroundImage(defaultImage);
    onClick();
  };
  return (
    <button
      disabled={isDisabled}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
      className="relative"
    >
      <img src={backgroundImage} className="h-14" />
      <span
        className={`absolute text-black top-1/2 right-1 text-start -translate-y-1/2 text-sm uppercase font-semibold ${className}`}
      >
        {children}
      </span>
    </button>
  );
}

function BetCounter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    if (count >= 10) {
      setCount(1);
      return;
    }
    setCount(count + 1);
  };

  const decrement = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  return (
    <div className="grid grid-cols-[2fr_2fr_2fr] items-center">
      <button className="hover:opacity-80" onClick={decrement}>
        <img src={arrow} />
      </button>
      <span className="flex flex-col text-center font-bold text-2xl">
        <span>{count}</span>
        <span className="text-[.5rem] leading-3 font-medium">Ставка</span>
      </span>
      <button className="hover:opacity-80" onClick={increment}>
        <img src={arrow} className="rotate-180" />
      </button>
    </div>
  );
}
