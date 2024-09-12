import ballImage from "../assets/ball.png";

export function BallsList() {
  return (
    <div className="grid grid-cols-[1fr_7fr] pt-2.5 pl-2.5 cursor-default">
      <div className="flex flex-col items-center whitespace-nowrap">
        <h1>KENO 4min</h1>
        <span>#804970</span>
      </div>
      <ul className="flex gap-[.1rem] flex-1 rounded-l-full items-center pt-1.5">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
          <Ball key={number} number={number} />
        ))}
      </ul>
    </div>
  );
}

function Ball({ number }: { number: number }) {
  return (
    <li
      className="h-full overflow-hidden aspect-square bg-center bg-cover bg-no-repeat rounded-full p-1.5 sliding-element"
      style={{
        backgroundImage: `url(${ballImage})`,
      }}
    >
      <span className="text-black text-xl font-bold w-full h-full flex justify-center items-center rotating-element">
        {number}
      </span>
    </li>
  );
}
