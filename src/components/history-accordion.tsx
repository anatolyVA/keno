import { useState } from "react";
import kenoHistoryBall from "../assets/ball-keno.png";
interface AdvancedHistory {
  date: string;
  game: string;
  count: number;
  balls: number[];
  bets: {
    id: number;
    state: string;
    balls: number[];
    sum: number;
    multiplier: number;
    win: number;
  }[];
  sum: number;
  win: number;
}

const advancedHistory: AdvancedHistory[] = [
  {
    date: "10.10.2022 17:15",
    game: "KENO 4MIN",
    count: 800001,
    balls: [1, 2, 3],
    bets: [
      {
        id: 7195583608,
        state: "Выигрыш",
        balls: [1, 2, 5],
        sum: 1,
        multiplier: 1,
        win: 1,
      },
    ],
    sum: 1,
    win: 1,
  },
  {
    date: "10.10.2022 17:15",
    game: "KENO 4MIN",
    count: 800002,
    balls: [1, 2, 3],
    bets: [
      {
        id: 7195583610,
        state: "Выигрыш",
        balls: [1, 2, 5],
        sum: 1,
        multiplier: 1,
        win: 1,
      },
    ],
    sum: 1,
    win: 1,
  },
  {
    date: "10.10.2022 17:15",
    game: "KENO 4MIN",
    count: 800003,
    balls: [1, 2, 3],
    bets: [
      {
        id: 7195583609,
        state: "Выигрыш",
        balls: [1, 2, 5],
        sum: 1,
        multiplier: 1,
        win: 1,
      },
    ],
    sum: 1,
    win: 1,
  },
];

export function HistoryAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <ul className="w-full flex flex-col gap-1 p-3 box-name">
      {advancedHistory.map((history) => (
        <HistoryAccordionItem
          onOpenChange={handleOpen}
          isOpen={openId === history.count}
          {...history}
        />
      ))}
    </ul>
  );
}

function HistoryAccordionItem(
  props: AdvancedHistory & {
    isOpen: boolean;
    onOpenChange: (id: number) => void;
  },
) {
  const handleOpenChange = () => {
    props.onOpenChange(props.count);
  };

  return (
    <li
      className={`flex flex-col gap-2 overflow-hidden ${props.isOpen ? "history-item-active" : ""}`}
    >
      <button
        onClick={handleOpenChange}
        className={`relative grid history-item__row grid-cols-[2fr_2fr_1fr_6fr_1fr_1fr_1fr] font-semibold items-center pl-5 h-[2.5rem] pr-2 rounded-lg text-xs  ${props.isOpen ? "bg-[#fffde4]" : "bg-white"} text-start text-[#394751]`}
      >
        <span>{props.date}</span>
        <span>{props.game}</span>
        <span>{props.count}</span>
        <div className="flex gap-0.5">
          {props.balls.map((ball) => (
            <div
              className={`flex justify-center items-center h-full w-[1.25rem] aspect-square bg-center bg-no-repeat`}
              style={{
                backgroundImage: `url(${kenoHistoryBall})`,
                backgroundSize: "100% 100%",
              }}
            >
              {ball}
            </div>
          ))}
        </div>
        <span>{props.bets.length}</span>
        <span>{props.sum}</span>
        <span>{props.win}</span>
      </button>
      <div className="overflow-hidden">
        <div
          className={`flex-col gap-3 px-4 ${props.isOpen ? "flex" : "hidden"} accordion-content-open`}
        >
          <header className="text-[0.625rem] grid grid-cols-[12%_13%_40%_9%_9%_9%] items-center h-[1.675rem] font-bold text-[#aabbcc] px-3 bg-[#191e21] rounded-lg uppercase">
            <span>Ставки</span>
            <span>Состояние</span>
            <span>Комбинации</span>
            <span>Сумма</span>
            <span>Коэф.</span>
            <span>Выигрыш</span>
          </header>
          <div className="flex flex-col gap-2 mb-1">
            {props.bets.map((bet, index) => (
              <HistoryAccordionItemBet
                droppedBalls={props.balls}
                number={index + 1}
                {...bet}
              />
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function HistoryAccordionItemBet(props: {
  number: number;
  id: number;
  state: string;
  droppedBalls: number[];
  balls: number[];
  sum: number;
  multiplier: number;
  win: number;
}) {
  return (
    <div className="grid grid-cols-[12%_13%_40%_9%_9%_9%] font-semibold items-center h-[2.5rem] text-[0.625rem] text-black px-3 bg-[#e0e5eb] rounded-lg">
      <div className="flex gap-1 items-end">
        <span className="">{props.number} </span>
        <span className="text-[70%] text-black/60 leading-3">
          (ID {props.id})
        </span>
      </div>
      <span>{props.state}</span>
      <div className="flex gap-0.5">
        {props.balls.map((ball) => (
          <div
            className={`flex justify-center items-center h-full w-[1.25rem] aspect-square bg-center bg-no-repeat ${props.droppedBalls.includes(ball) ? "opacity-100" : "opacity-50"}`}
            style={{
              backgroundImage: `url(${kenoHistoryBall})`,
              backgroundSize: "100% 100%",
            }}
          >
            {ball}
          </div>
        ))}
      </div>
      <span>{props.sum}</span>
      <span>x{props.multiplier}</span>
      <span>{props.win}</span>
    </div>
  );
}
