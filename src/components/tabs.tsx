import React, { useEffect } from "react";
import tabImage from "../assets/tab.png";
//import tabSelectedImage from "../assets/tab-selected.png";
import tabPressedImage from "../assets/tab-pressed.png";
import btnClick from "../assets/sounds/buttonClick.mp3";
import { useHistoryModal } from "../lib/useHistoryModal.ts";
import { useStore } from "../lib/useStore.ts";
import { ButtonsGrid } from "./buttons-grid.tsx";
import { Info } from "./info.tsx";
import { Stats } from "./stats.tsx";

export function Tabs({
  isInfoOpen,
  onTabChange,
}: {
  onTabChange: (tab: string) => void;
  isInfoOpen: boolean;
}) {
  const [activeTab, setActiveTab] = React.useState("game");
  const isAppMuted = useStore((state) => state.isAppMuted);
  const audio = new Audio(btnClick);
  const [prevTab, setPrevTab] = React.useState("game");
  const [isPrevTabAnimation, setIsPrevTabAnimation] = React.useState<
    boolean | null
  >(null);
  const [rerender, setRerender] = React.useState(false);
  const openModalChange = useHistoryModal(
    (state) => state.setIsHistoryModalOpen,
  );

  useEffect(() => {
    if (isInfoOpen) {
      setPrevTab(activeTab);
      setActiveTab("info");
    } else {
      if (prevTab === "info") return;
      setActiveTab(prevTab);
    }
  }, [isInfoOpen]);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    setPrevTab(activeTab);
    setIsPrevTabAnimation(true);

    const playSound = () => {
      if (audio && !isAppMuted) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
    };

    const onAnimationEnd = () => {
      setIsPrevTabAnimation(false);
      setRerender(tab === "stats");
      setActiveTab(tab);
      onTabChange(tab);
    };

    setTimeout(() => {
      playSound();
      requestAnimationFrame(onAnimationEnd);
    }, 125);
  };

  const handleHistoryOpen = () => {
    openModalChange(true);
  };
  return (
    <div className="flex gap-2">
      <div
        className={`w-full ${activeTab === "game" ? "" : "hidden"} ${isPrevTabAnimation ? "prev-tab-swap" : isPrevTabAnimation === null ? "" : "new-tab-swap"}`}
      >
        <ButtonsGrid />
      </div>
      <div
        className={`w-full ${activeTab === "video" ? "" : "hidden"} ${isPrevTabAnimation ? "prev-tab-swap" : "new-tab-swap"}`}
      >
        Видео недоступно
      </div>
      <Info
        className={`w-full h-full ${activeTab === "info" ? "" : "hidden"} ${isPrevTabAnimation ? "prev-tab-swap" : "new-tab-swap"}`}
      />
      <Stats
        rerender={rerender}
        className={`w-full h-full ${activeTab === "stats" ? "" : "hidden"} ${isPrevTabAnimation ? "prev-tab-swap" : "new-tab-swap"}`}
      />
      <div className="grid grid-rows-4 gap-2 w-12">
        <TabButton onSelect={handleTabChange} activeTab={activeTab} name="game">
          Игра
        </TabButton>
        <TabButton
          onSelect={handleTabChange}
          activeTab={activeTab}
          name="video"
        >
          Видео
        </TabButton>
        <TabButton
          onSelect={handleHistoryOpen}
          activeTab={activeTab}
          name="history"
        >
          История
        </TabButton>
        <TabButton
          onSelect={handleTabChange}
          activeTab={activeTab}
          name="stats"
        >
          Статист
        </TabButton>
      </div>
    </div>
  );
}

interface TabButtonProps {
  name: string;
  activeTab: string;
  children: React.ReactNode;
  onSelect: (name: string) => void;
}

function TabButton({ name, activeTab, children, onSelect }: TabButtonProps) {
  const handleClick = () => {
    console.log(name);
    onSelect(name);
  };
  return (
    <button
      className="relative w-24 h-12 -rotate-90 origin-bottom"
      onClick={handleClick}
    >
      <img src={name === activeTab ? tabPressedImage : tabImage}></img>
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm uppercase font-semibold"
        style={{
          color: name === activeTab ? "white" : "black",
        }}
      >
        {children}
      </span>
    </button>
  );
}
