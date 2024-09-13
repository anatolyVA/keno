import { useEffect } from "react";
import tableHeader from "../assets/table-header.png";
import { useStore } from "../lib/useStore.ts";

export interface HistoryProps {
  count: number;
  balls: number[];
}

export function History() {
  const history = useStore((state) => state.history);
  useEffect(() => {
    console.log(history);
  }, [history]);
  return (
    <div className="flex flex-col rounded-lg overflow-hidden">
      <div className="relative">
        <img src={tableHeader} />
        <button className="absolute top-0 px-4 text-start left-0 uppercase text-black w-full">
          История
        </button>
        <div className="grid grid-cols-[1fr_6fr] h-[1.4375rem] px-1 text-black absolute top-[1.75rem] text-xs w-full">
          <span className="text-center">#</span>
          <span className="">Шары</span>
        </div>
        {/*{history*/}
        {/*  .slice(*/}
        {/*    history.length > 5 ? history.length - 5 : 0,*/}
        {/*    history.length - 1,*/}
        {/*  )*/}
        {/*  .map((history) => (*/}
        {/*    <HistoryRow key={history.count} history={history} />*/}
        {/*  ))}*/}
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
