import { useEffect, useState } from "react";
import { useStore } from "../lib/useStore.ts";
import { History } from "./history.tsx";
import { Ticket } from "./ticket.tsx";
import btnClick from "../assets/sounds/buttonClick.mp3";

export function Accordion() {
  const [collapsedElem, setCollapsedElem] = useState<"history" | "ticket">(
    "ticket",
  );
  const audio = new Audio(btnClick);
  const isAppMuted = useStore((state) => state.isAppMuted);

  useEffect(() => {
    console.log(collapsedElem);
  }, [collapsedElem]);

  const toggleCollapsedElement = (element: typeof collapsedElem) => {
    setCollapsedElem((prev) =>
      prev === element
        ? element === "history"
          ? "ticket"
          : "history"
        : element,
    );
    if (audio && !isAppMuted) audio.play();
  };

  return (
    <div className="flex flex-col gap-2 h-full font-avita">
      <History
        isCollapsed={collapsedElem === "ticket"}
        onCollapse={() => toggleCollapsedElement("history")}
      />
      <Ticket
        isCollapsed={collapsedElem === "history"}
        onCollapse={() => toggleCollapsedElement("ticket")}
      />
    </div>
  );
}
