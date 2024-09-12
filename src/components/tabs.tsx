import React from "react";
import tabImage from "../assets/tab.png";
//import tabSelectedImage from "../assets/tab-selected.png";
import tabPressedImage from "../assets/tab-pressed.png";

export function Tabs({ content }: { content: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState("game");

  return (
    <div className="flex gap-2">
      <div className="flex-1">{content}</div>
      <div className="grid grid-rows-4 gap-2">
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
      className="bg-center bg-no-repeat w-14 bg-cover h-full rounded-md"
      style={{
        backgroundImage: `url(${name === activeTab ? tabPressedImage : tabImage})`,
        color: name === activeTab ? "white" : "black",
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
