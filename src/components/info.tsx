import coeff from "../assets/table_coefficients_green.png";
import tabBg from "../assets/tab-bg.png";

const coeffs = [
  0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 2, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 50, 10, 3, 2, 2, 0, 0, 0, 0, 0, 0, 100, 20, 15, 4, 5, 1,
  0, 0, 0, 0, 0, 150, 60, 20, 15, 10, 5, 0, 0, 0, 0, 0, 500, 80, 50, 25, 30, 0,
  0, 0, 0, 0, 0, 1000, 200, 125, 100, 0, 0, 0, 0, 0, 0, 0, 2000, 1000, 300, 0,
  0, 0, 0, 0, 0, 0, 0, 5000, 2000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10000,
];

export function Info({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col gap-2 p-3 bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${tabBg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <h1 className="font-semibold text-center text-lg uppercase">
        Коэффициенты
      </h1>
      <div
        className="w-full h-full grid grid-cols-[1fr_9fr] pr-[.03rem] gap-0.5"
        style={{
          backgroundImage: `url(${coeff})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="grid grid-cols-[1.1fr_1.5fr] font-semibold pt-1 grid-rows-13 gap-0.5 text-black">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="row-span-13 flex justify-center items-center uppercase">
            <span className="whitespace-nowrap absolute -rotate-90">
              Угадано шаров
            </span>
          </div>
          {Array.from({ length: 11 }).map((_, index) => (
            <div
              key={index}
              className="w-full flex justify-center items-center"
            >
              {index}
            </div>
          ))}
        </div>
        <div className="grid grid-rows-13 text-black font-semibold uppercase grid-cols-[6.4%_6.4%_6.4%_9.8%_9.8%_9.6%_11.2%_11.3%_11.2%_14.4%] gap-0.5">
          <div className="col-span-10 flex justify-center items-center">
            Выбрано шаров
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex justify-center">
              {index + 1}
            </div>
          ))}
          {coeffs.map((value, index) => (
            <div
              key={index}
              className={`flex font-medium leading-3 text-white items-center justify-center ${index + 1 > 60 ? "pb-1" : ""}`}
            >
              <span>{value !== 0 && value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
