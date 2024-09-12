import { GamePanelFooter } from "./game.panel-footer.tsx";
import { GamePanelHeader } from "./game.panel-header.tsx";
import { GamePanel } from "./game.panel.tsx";

export function Game() {
  return (
    <div className="bg-[#040c17]/80 backdrop-blur-sm w-[1326px] h-[786px] max-h-[786px] flex flex-col">
      <GamePanelHeader />
      <GamePanel />
      <GamePanelFooter />
    </div>
  );
}
