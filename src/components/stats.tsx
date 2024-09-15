import { useEffect, useState } from "react";
import hotColdImage from "../assets/hotcold-bg.png";
import tabBg from "../assets/tab-bg.png";

type Stat = {
  number: number;
  percentDrops: number;
};

export const hot: Stat[] = [
  {
    number: 25,
    percentDrops: 32,
  },
  {
    number: 50,
    percentDrops: 34,
  },
  {
    number: 75,
    percentDrops: 38,
  },
  {
    number: 63,
    percentDrops: 35,
  },
  {
    number: 54,
    percentDrops: 36,
  },
  {
    number: 42,
    percentDrops: 37,
  },
];
export const cold: Stat[] = [
  {
    number: 12,
    percentDrops: 28,
  },
  {
    number: 48,
    percentDrops: 25,
  },
  {
    number: 7,
    percentDrops: 22,
  },
  {
    number: 63,
    percentDrops: 19,
  },
  {
    number: 29,
    percentDrops: 27,
  },
  {
    number: 75,
    percentDrops: 24,
  },
];

export function Stats({
  className,
  rerender,
}: {
  className?: string;
  rerender: boolean;
}) {
  return (
    <div
      className={`flex flex-col p-2 w-full h-full bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${tabBg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <h1 className="font-semibold text-lg uppercase whitespace-nowrap">
        Рейтинг выпадений шаров за последние 100 раундов
      </h1>
      <div
        className="w-full h-full grid grid-cols-6 pl-[3.35rem] pr-[.03rem] gap-1.5"
        style={{
          backgroundImage: `url(${hotColdImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        {hot.map(({ number, percentDrops }, index) => (
          <StatItem
            number={number}
            percentDrops={percentDrops}
            isHot
            rerender={rerender}
            key={index}
          />
        ))}

        {cold.map(({ number, percentDrops }, index) => (
          <StatItem
            number={number}
            percentDrops={percentDrops}
            rerender={rerender}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function StatItem({
  number,
  percentDrops,
  isHot,
  rerender,
}: Stat & { isHot?: boolean; rerender: boolean }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!rerender) return;
    setPercent(0);
    let goingUp = true;
    let delayTimeout: number;

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (goingUp) {
          // Увеличиваем, пока не достигнем percentDrops + 3
          if (prev < percentDrops + 3) {
            return prev + 1;
          } else {
            goingUp = false;

            clearInterval(interval);
            delayTimeout = setTimeout(() => {
              const newInterval = setInterval(() => {
                setPercent((prev) => {
                  if (prev > percentDrops) {
                    return prev - 1;
                  } else {
                    clearInterval(newInterval);
                    return prev;
                  }
                });
              }, 100);
            }, 100);

            return prev;
          }
        }
        return prev;
      });
    }, 10);

    return () => clearInterval(delayTimeout);
  }, [percentDrops, rerender]);

  return (
    <div className="flex flex-col-reverse gap-1 h-full">
      <div className="h-[35%] text-4xl font-semibold flex justify-center items-center">
        {number}
      </div>
      <div
        className={`"flex relative items-end justify-center ${isHot ? "bg-[#c30000]" : "bg-[#2a6fd5]"} h-[62%]"`}
        style={{
          height: `${62 * (percent / 100)}%`,
        }}
      >
        <span
          className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-3xl ${isHot ? "text-[#fe801b]" : "text-[#9bccff]"} font-semibold`}
        >
          {percent}%
        </span>
      </div>
    </div>
  );
}
