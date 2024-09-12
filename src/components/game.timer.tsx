//import { useState } from "react";

export function GameTimer({ seconds }: { seconds: number }) {
  //const [timer, setTimer] = useState(seconds);

  return (
    <div className="h-5 relative w-full bg-black drop-shadow-xl p-0.5">
      <div className="h-full w-1/2 bg-[#00a651]"></div>
      <span className="absolute top-0.5 right-1/2 translate-x-1/2 text-xs uppercase">
        Делайте ваши ставки
      </span>
      <span className="absolute top-0.5 right-0 text-xs">{seconds}</span>
    </div>
  );
}
