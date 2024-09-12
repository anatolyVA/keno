import { BallsList } from "./balls-list.tsx";
import { ButtonsGrid } from "./buttons-grid.tsx";
import { GameControlPanel } from "./game.control-panel.tsx";
import { GameTimer } from "./game.timer.tsx";
import backgroundImage from "../assets/bg-green.jpg";
import headerImage from "../assets/header.png";
import { Tabs } from "./tabs.tsx";

export function GamePanel() {
  return (
    <div
      className="h-full flex flex-col bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div
        className="flex flex-col bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${headerImage})`,
        }}
      >
        <BallsList />
        <GameTimer seconds={200} />
      </div>
      <div className="grid grid-cols-[6fr_3fr] gap-8 flex-1 px-9 py-7">
        <Tabs content={<ButtonsGrid />} />
        <div className="grid grid-rows-[1fr_3fr_6fr] gap-2">
          <header>jackpot</header>
          <div className="bg-black/20">abc</div>
          <div className="bg-black/20">abc</div>
        </div>
      </div>
      <GameControlPanel />
    </div>
  );
}
