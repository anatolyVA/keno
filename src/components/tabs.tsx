import React from "react";
import tabImage from "../assets/tab.png";
//import tabSelectedImage from "../assets/tab-selected.png";
import tabPressedImage from "../assets/tab-pressed.png";

export function Tabs({ content }: { content: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState("game");

  return (
    <div className="flex gap-2">
      <div className="w-full">{content}</div>
      <div className="grid grid-rows-4 gap-2 w-12">
        <TabButton onSelect={setActiveTab} activeTab={activeTab} name="game">
          Игра
        </TabButton>
        <TabButton onSelect={setActiveTab} activeTab={activeTab} name="video">
          Видео
        </TabButton>
        <TabButton onSelect={setActiveTab} activeTab={activeTab} name="history">
          История
        </TabButton>
        <TabButton onSelect={setActiveTab} activeTab={activeTab} name="stats">
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
