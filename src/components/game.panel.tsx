import React, { useState } from "react";
import eyeClosedIconMin from "../assets/btn-eye-closed-min.png";
import eyeIconMin from "../assets/btn-eye-min.png";
import eyeClosedIconMinHovered from "../assets/btn-eye-closed-mode-selected-min.png";
import eyeIconMinHovered from "../assets/btn-eye-mode-selected2-min.png";
import btnClick from "../assets/sounds/buttonClick.mp3";
import { useHistoryModal } from "../lib/useHistoryModal.ts";
import { useStore } from "../lib/useStore.ts";
import { Accordion } from "./accordion.tsx";
import { BallsList } from "./balls-list.tsx";
import { ButtonsGrid } from "./buttons-grid.tsx";
import { GameControlPanel } from "./game.control-panel.tsx";
import { GameTimer } from "./game.timer.tsx";
import backgroundImage from "../assets/bg-green.jpg";
import headerImage from "../assets/header.png";
import jackpotImage from "../assets/JackPot.png";
import myBetsImage from "../assets/btn-my-bets.png";
import myBetsSelectedImage from "../assets/btn-my-bets-selected.png";
import { HistoryModal } from "./history-modal.tsx";
import { Tabs } from "./tabs.tsx";

export function GamePanel() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const handleMenuStateChange = (state: boolean) => {
    setIsMenuOpen(state);
  };
  const handleInfoToggle = () => {
    setIsInfoOpen(!isInfoOpen);
  };
  return (
    <div
      className="h-full flex flex-col bg-center relative bg-no-repeat bg-cover overflow-hidden font-avita"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <HistoryModal />
      <SideBar isMenuOpen={isMenuOpen} />
      <div
        className="flex flex-col bg-no-repeat h-[10rem] relative"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: "cover",
        }}
      >
        <BallsList />
        <GameTimer seconds={10} />
      </div>
      <div className="grid grid-cols-[6fr_3fr] gap-8 h-full pl-9 pr-6">
        <Tabs
          onTabChange={() => setIsInfoOpen(false)}
          isInfoOpen={isInfoOpen}
        />
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-4 items-center">
            <img src={jackpotImage} className="h-8" />
            <span className="text-3xl font-bold text-[#d6d6d6]">9 088</span>
          </div>
          <Accordion />
        </div>
      </div>
      <GameControlPanel
        isInfoOpen={isInfoOpen}
        onInfoToggle={handleInfoToggle}
        isMenuOpen={isMenuOpen}
        onOpenMenu={handleMenuStateChange}
      />
    </div>
  );
}

function SideBar({ isMenuOpen }: { isMenuOpen: boolean | null }) {
  const setIsHistoryOpen = useHistoryModal(
    (state) => state.setIsHistoryModalOpen,
  );

  const handleHistoryOpen = () => {
    setIsHistoryOpen(true);
  };

  return (
    <aside
      className={`absolute left-0 bottom-0 bg-black/60 z-50 h-[calc(100%-5.3rem)] w-[4.6rem] ${
        isMenuOpen
          ? "sidebar-slide"
          : isMenuOpen === null
            ? "hidden"
            : "sidebar-slide-close"
      }`}
    >
      <div className="flex flex-col gap-4 justify-center text-[.625rem] h-full items-center">
        <HotColdShowToggle />
        <button
          className="flex flex-col items-center gap-1"
          onClick={handleHistoryOpen}
        >
          <img src={myBetsImage} className="h-7" />
          <span>Мои ставки</span>
        </button>
      </div>
    </aside>
  );
}

function HotColdShowToggle() {
  const [isHovered, setIsHovered] = useState(false);
  const hotColdShow = useStore((state) => state.showHotCold);
  const setHotColdShow = useStore((state) => state.setShowHotCold);
  const isAppMuted = useStore((state) => state.isAppMuted);
  const audio = new Audio(btnClick);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (audio && !isAppMuted) audio.play();
    setHotColdShow(!hotColdShow);
  };
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleShow}
    >
      <img
        src={
          hotColdShow
            ? isHovered
              ? eyeClosedIconMinHovered
              : eyeClosedIconMin
            : isHovered
              ? eyeIconMinHovered
              : eyeIconMin
        }
        className="h-6"
      />
    </button>
  );
}
