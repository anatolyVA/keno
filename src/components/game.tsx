import { useEffect, useState } from "react";
import { GamePanelFooter } from "./game.panel-footer.tsx";
import { GamePanelHeader } from "./game.panel-header.tsx";
import { GamePanel } from "./game.panel.tsx";
import loadingIcon from "../assets/loading.svg";

export function Game() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleFullScreen = () => {
    const elem = document.documentElement;
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
        );
      });
      setIsFullScreen(true);
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      const timer = setTimeout(() => {
        setIsFirstRender(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className={`bg-[#040c17]/80 backdrop-blur-sm flex flex-col w-[69vw] frame`}
    >
      <GamePanelHeader onFullScreen={handleFullScreen} />
      {isFirstRender ? (
        <div className="flex items-center justify-center flex-1 bg-black">
          <img src={loadingIcon} />
        </div>
      ) : (
        <>
          <GamePanel />
          <GamePanelFooter />
        </>
      )}
    </div>
  );
}
