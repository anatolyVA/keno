import { useEffect } from "react";
import tableHeader from "../assets/table-header.png";
import { useStore } from "../lib/useStore.ts";
import expand from "../assets/expand.png";

export interface HistoryProps {
  count: number;
  balls: number[];
}

export function History({
  isCollapsed,
  onCollapse,
}: {
  isCollapsed: boolean;
  onCollapse: () => void;
}) {
  const history = useStore((state) => state.history);

  const handleCollapseChange = () => {
    onCollapse();
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden">
      <div className="relative">
        <img src={tableHeader} />
        <button
          onClick={handleCollapseChange}
          className="group absolute top-0 px-4 text-start left-0 uppercase text-black w-full"
        >
          <div className="flex items-center justify-between">
            История
            <img
              src={expand}
              className={`h-3 ${isCollapsed ? "rotate-0" : "rotate-90"} transition-transform`}
            />
          </div>
        </button>
        <div className="grid grid-cols-[1fr_6fr] h-[1.4375rem] px-1 text-black absolute top-[1.75rem] text-xs w-full">
          <span className="text-center">#</span>
          <span className="">Шары</span>
        </div>
        <div className="px-[.05rem]">
          {history
            .slice(-(isCollapsed ? 1 : 5)) // Выбираем последние элементы в зависимости от collapsed
            .map((history, index) => (
              <div
                key={index}
                className={`grid grid-cols-[1fr_6fr] h-[1.4375rem] last:rounded-b-lg items-center px-1 text-black text-xs ${index % 2 === 0 ? "bg-[#9acdb2]/70" : "bg-white/70"}`}
              >
                <span className="text-center text-[.5rem]">
                  {history.count}
                </span>
                <span className="text-start text-[.5rem] grid grid-cols-[repeat(20,1fr)] whitespace-nowrap">
                  {history.balls
                    .sort((a, b) => a - b)
                    .map((ball) => (
                      <span key={ball} className="text-center">
                        {ball}
                      </span>
                    ))}
                </span>
              </div>
            ))}
          {Array.from({ length: (isCollapsed ? 1 : 5) - history.length })
            .slice(-(isCollapsed ? 1 : 5))
            .map((_, index) => {
              // Определяем, каким был цвет последнего элемента первого map
              const lastIndex = history.length % 2;
              const isEven = (lastIndex + index) % 2 === 0;

              return (
                <div
                  key={index}
                  className={`grid grid-cols-[1fr_6fr] h-[1.4375rem] last:rounded-b-lg items-center px-1 text-black text-xs ${isEven ? "bg-[#9acdb2]/70" : "bg-white/70"}`}
                >
                  <span className="text-center text-[.5rem]"></span>
                  <span className="text-start text-[.5rem] whitespace-nowrap"></span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// function HistoryRow({ history }: { history: HistoryProps }) {
//   return (
//     <div className="grid grid-cols-[1fr_6fr] h-[1.4375rem] px-1 text-black text-xs w-full">
//       <span className="text-center">{history.count}</span>
//       <span className="text-center">{history.balls.sort().join(",")}</span>
//     </div>
//   );
// }
