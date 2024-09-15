import { useBetCount } from "../lib/useBetCount.ts";
import { useStore } from "../lib/useStore.ts";
import appSoundIcon from "../assets/sound_icon.png";
import appMutedIcon from "../assets/mute_icon.png";

function calculateMaxWinnings(
  correctPredictions: number,
  betAmount: number,
): number {
  const coefficients: { [key: number]: number } = {
    0: 0,
    1: 3.5,
    2: 10,
    3: 50,
    4: 100,
    5: 150,
    6: 500,
    7: 1000,
    8: 2000,
    9: 5000,
    10: 10000,
  };
  const coefficient = coefficients[correctPredictions];
  return betAmount * coefficient;
}

function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function GamePanelFooter() {
  const selectedBalls = useStore((state) => state.selectedBalls);
  const balance = 9000000.35;
  const bet = useBetCount((state) => state.bet);
  const maxWin = calculateMaxWinnings(selectedBalls.length, bet);

  return (
    <footer className="grid grid-cols-[1.4fr_2fr_1.5fr] items-center gap-2 px-1 bg-black h-6 font-avita text-xs">
      <div className="flex gap-6">
        <MuteToggle />
        <span className="uppercase hover:font-semibold cursor-pointer">
          Автоигра
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 whitespace-nowrap">
        <div className="flex gap-1">
          <span>Баланс: {formatNumber(balance)}</span>
          <span className="text-[.4rem] flex flex-col items-center leading-[.5rem]">
            <span>KZT</span>
            <span>(тенге)</span>
          </span>
        </div>
        <span className="text-center">Ставка: {bet}</span>
        <span>Макс. выигрыш: {maxWin}</span>
      </div>
      <div></div>
    </footer>
  );
}

function MuteToggle() {
  const isAppMuted = useStore((state) => state.isAppMuted);
  const setIsAppMuted = useStore((state) => state.setIsAppMuted);

  const handleClick = () => {
    setIsAppMuted(!isAppMuted);
  };

  return (
    <button
      className={isAppMuted ? "text-red-500" : "text-white"}
      onClick={handleClick}
    >
      <img className="h-4" src={isAppMuted ? appMutedIcon : appSoundIcon} />
    </button>
  );
}
