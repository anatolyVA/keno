import ballImage from "../assets/ball.png";

export function BallsList() {
  return (
    <div className="flex min-h-[5rem] pt-2.5 pl-2.5 cursor-default bg-no-repeat bg-cover">
      <div className="flex flex-col items-center">
        <h1>KENO 4min</h1>
        <span>#804970</span>
      </div>
      <ul className="flex gap-[.1rem] flex-1 rounded-l-full items-center h-fit pt-1.5 ml-[4.2rem]">
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
      className="w-[3.43rem] h-[3.43rem] bg-center bg-cover bg-no-repeat rounded-full p-1.5 sliding-element"
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
