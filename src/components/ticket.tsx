import tableHeader from "../assets/table-header.png";
import { useStore } from "../lib/useStore.ts";

export interface TicketProps {
  balls: number[];
  bet: number;
  multiplier: number;
  win: number;
}

export function Ticket() {
  const tickets = useStore((state) => state.tickets);
  const activeBalls = useStore((state) => state.globalActiveBalls);
  return (
    <div className="flex flex-col rounded-lg overflow-hidden h-[15rem]">
      <div className="relative">
        <img src={tableHeader} />
        <button className="absolute top-0 px-4 text-start left-0 uppercase text-black w-full">
          Купон
        </button>
        <div className="grid grid-cols-[7fr_2fr_1fr_2fr] h-[1.4375rem] px-1 text-black absolute top-[1.75rem] text-xs">
          <span className="ml-3">Шары</span>
          <span className="text-center">Ставка</span>
          <span className="text-center">X</span>
          <span className="text-center">Выигрыш</span>
        </div>
      </div>
      <div className="flex flex-col px-[.05rem] overflow-y-scroll">
        {tickets.map((ticket) => (
          <div className="grid grid-cols-[7fr_2fr_1fr_2fr] min-h-[1.4375rem] max-h-[1.4375rem] items-center px-1 bg-[#9acdb2]/70 text-black text-xs">
            <div className="flex gap-[.1rem] ">
              {ticket.balls.map((ball) => (
                <span
                  className={`rounded-sm text-[.5rem] w-4 h-4 flex justify-center items-center ${activeBalls.includes(ball) ? "bg-[#fff200] text-black" : "bg-black text-white"}`}
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
      </div>
    </div>
  );
}
