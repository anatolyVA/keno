import { BallsList } from "./balls-list.tsx";
import { ButtonsGrid } from "./buttons-grid.tsx";
import { GameControlPanel } from "./game.control-panel.tsx";
import { GameTimer } from "./game.timer.tsx";
import backgroundImage from "../assets/bg-green.jpg";
import headerImage from "../assets/header.png";
import jackpotImage from "../assets/JackPot.png";
import { History } from "./history.tsx";
import { Tabs } from "./tabs.tsx";
import { Ticket } from "./ticket.tsx";

export function GamePanel() {
  return (
    <div
      className="h-full flex flex-col bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
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
        <Tabs content={<ButtonsGrid />} />
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-4 items-center">
            <img src={jackpotImage} className="h-8" />
            <span className="text-3xl font-bold text-[#d6d6d6]">9 088</span>
          </div>
          <div className="grid grid-rows-[2fr_4fr] h-full">
            <History />
            <Ticket />
          </div>
        </div>
      </div>
      <GameControlPanel />
    </div>
  );
}
