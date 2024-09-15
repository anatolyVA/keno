import K from "../assets/K.png";
import E from "../assets/E.png";
import N from "../assets/N.png";
import O from "../assets/O.png";
import frMin from "../assets/4min.png";

export function Logo() {
  return (
    <div className="flex gap-[.1rem] h-6">
      <img src={K} className="h-[1.4rem]" />
      <img src={E} className="h-[1.4rem]" />
      <img src={N} className="h-[1.4rem]" />
      <img src={O} className="h-[1.4rem]" />
      <img src={frMin} className="ml-2 h-6" />
    </div>
  );
}
