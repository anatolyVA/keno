import React from "react";
import expand from "../assets/expand.png";
import tableHeader from "../assets/table-header.png";
import { useStore } from "../lib/useStore.ts";
import eyeIconMin from "../assets/eye-icon-min.png";
import eyeClosedIconMin from "../assets/eye-closed-icon-min.png";
import betBottomImage from "../assets/bet-bot.png";
import btnClick from "../assets/sounds/buttonClick.mp3";

export interface TicketProps {
  balls: number[];
  bet: number;
  multiplier: number;
  win: number;
}

export function Ticket({
  isCollapsed,
  onCollapse,
}: {
  isCollapsed: boolean;
  onCollapse: () => void;
}) {
  const tickets = useStore((state) => state.tickets);
  const activeBalls = useStore((state) => state.globalActiveBalls);
  const isGameStarted = useStore((state) => state.isGameStarted);
  const isGameStarting = useStore((state) => state.isGameStarting);

  const handleCollapseChange = () => {
    onCollapse();
  };

  return (
    <div
      className={`flex flex-col relative rounded-lg overflow-hidden  ${isCollapsed ? "h-[11.75rem] max-h-[11.75rem]" : "h-[17.5rem] max-h-[17.5rem]"}`}
    >
      <div className="relative">
        <img src={tableHeader} />
        <button
          onClick={handleCollapseChange}
          className="absolute top-0 px-4 text-start left-0 uppercase text-black w-full"
        >
          <div className="flex items-center justify-between">
            <span>Купон {tickets.length > 0 ? `(${tickets.length})` : ""}</span>
            <HotColdShowToggle />
            <img
              src={expand}
              className={`h-3 ${isCollapsed ? "rotate-0" : "rotate-90"} transition-transform`}
            />
          </div>
        </button>
        <div className="grid grid-cols-[7fr_2fr_1fr_2fr] h-[1.4375rem] px-1 text-black absolute top-[1.75rem] text-xs">
          <span className="ml-3">Шары</span>
          <span className="text-center">Ставка</span>
          <span className="text-center">X</span>
          <span className="text-center">Выигрыш</span>
        </div>
      </div>
      <div className="flex flex-col px-[.05rem] overflow-y-scroll">
        {tickets.map((ticket, index) => (
          <div
            className={`grid grid-cols-[7fr_2fr_1fr_2fr] min-h-[1.4375rem] max-h-[1.4375rem] items-center px-1 text-black text-xs ${index % 2 === 0 ? "bg-[#9acdb2]/70" : "bg-white/70"}`}
          >
            <div className="flex gap-[.1rem] ">
              {ticket.balls.map((ball) => (
                <span
                  className={`rounded-sm text-[.5rem] w-4 h-4 flex justify-center items-center ${isGameStarted && !isGameStarting && activeBalls.includes(ball) ? "bg-[#fff200] text-black" : "bg-black text-white"}`}
                >
                  {ball}
                </span>
              ))}
            </div>
            <span className="text-center">{ticket.bet}</span>
            <span className="text-center">{ticket.multiplier}</span>
            <span className="text-center">{ticket.win}</span>
          </div>
        ))}
        {tickets.length < 10 &&
          Array.from({ length: 10 - tickets.length }).map((_, index) => {
            const lastIndex = tickets.length % 2;
            const isEven = (lastIndex + index) % 2 === 0;
            return (
              <div
                className={`grid grid-cols-[7fr_2fr_1fr_2fr] min-h-[1.4375rem] max-h-[1.4375rem] items-center px-1 text-black text-xs ${isEven ? "bg-[#9acdb2]/70" : "bg-white/70"}`}
              >
                <div className="flex gap-[.1rem] "></div>
                <span className="text-center"></span>
                <span className="text-center"></span>
                <span className="text-center"></span>
              </div>
            );
          })}
        <div
          className={`grid grid-cols-[7fr_2fr_1fr_2fr] min-h-[1.4375rem] max-h-[1.4375rem] items-center px-1 text-black text-xs bg-[#9acdb2]/70`}
        >
          <div className="flex gap-[.1rem] "></div>
          <span className="text-center"></span>
          <span className="text-center"></span>
          <span className="text-center"></span>
        </div>
        <div
          className="absolute -bottom-[.1rem] -left-[.1rem] w-[calc(100%+.2rem)] grid grid-cols-[7fr_2fr_1fr_2fr] min-h-[1.4375rem] bg-cover items-center bg-center bg-no-repeat text-black"
          style={{
            backgroundImage: `url(${betBottomImage})`,
          }}
        >
          <span className="text-end mr-4 text-xs uppercase font-semibold">
            Итого:
          </span>
          <span className="text-xs">
            {tickets.reduce((acc, ticket) => acc + ticket.bet, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

function HotColdShowToggle() {
  const hotColdShow = useStore((state) => state.showHotCold);
  const setHotColdShow = useStore((state) => state.setShowHotCold);
  const isAppMuted = useStore((state) => state.isAppMuted);
  const audio = new Audio(btnClick);

  const toggleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (audio && !isAppMuted) audio.play();
    setHotColdShow(!hotColdShow);
  };
  return (
    <button onClick={toggleShow}>
      <img src={hotColdShow ? eyeClosedIconMin : eyeIconMin} className="h-4" />
    </button>
  );
}
