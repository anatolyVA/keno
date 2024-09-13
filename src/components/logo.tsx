import K from "../assets/k.png";
import E from "../assets/e.png";
import N from "../assets/n.png";
import O from "../assets/o.png";
import frMin from "../assets/4min.png";

export function Logo() {
  return (
    <div className="flex h-6">
      <img src={K} />
      <img src={E} />
      <img src={N} />
      <img src={O} />
      <img src={frMin} className="ml-2" />
    </div>
  );
}
