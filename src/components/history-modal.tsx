import { useHistoryModal } from "../lib/useHistoryModal.ts";
import historyCloseImage from "../assets/historyClose.png";
import { HistoryAccordion } from "./history-accordion.tsx";

export function HistoryModal() {
  const isOpen = useHistoryModal((state) => state.isHistoryModalOpen);
  const openChange = useHistoryModal((state) => state.setIsHistoryModalOpen);

  return (
    <div
      className={`absolute w-[calc(100% - 4rem)] rounded-lg h-[calc(100% - 4rem)] font-avenir bg-[#191e21] z-[80] overflow-hidden flex-col top-2 left-4 right-4 bottom-0 ${isOpen ? "flex" : "hidden"}`}
    >
      <header className="relative grid grid-cols-[2fr_2fr_1fr_6fr_1fr_1fr_1fr] items-center px-6 text-[#aabbcc] text-[0.625rem] h-[1.675rem] font-bold uppercase">
        <span>Дата</span>
        <span>Игра</span>
        <span>Раунд</span>
        <span>Результат</span>
        <span>Ставок</span>
        <span>Сумма</span>
        <span>Выигрыш</span>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2"
          onClick={() => openChange(false)}
        >
          <img src={historyCloseImage} />
        </button>
      </header>
      <div className="bg-[#edeef2] flex flex-1">
        <HistoryAccordion />
      </div>
    </div>
  );
}
