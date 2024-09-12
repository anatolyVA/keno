import { useState } from "react";
import zoneImage from "../assets/zone.png";
import zoneSelectedImage from "../assets/zone-selected.png";

export function ButtonsGrid() {
  return (
    <div className="grid grid-cols-10 gap-0.2 h-full">
      {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
        <SelectBallButton key={number} number={number} />
      ))}
    </div>
  );
}

function SelectBallButton({ number }: { number: number }) {
  const [backgroundImage, setBackgroundImage] = useState(zoneImage);
  const [selected, setSelected] = useState(false);
  const onMouseOver = () => {
    setBackgroundImage(zoneSelectedImage);
  };
  const onMouseOut = () => {
    if (selected) return;
    setBackgroundImage(zoneImage);
  };
  const handleSelectChange = () => {
    setSelected((prev) => !prev);
    setBackgroundImage(zoneSelectedImage);
  };
  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={handleSelectChange}
      className={`h-full bg-no-repeat bg-center bg-cover text-3xl ${selected ? "animation" : ""}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {number}
    </button>
  );
}
