import { create } from "zustand";

interface useHistoryModalState {
  setIsHistoryModalOpen: (isHistoryModalOpen: boolean) => void;
  isHistoryModalOpen: boolean;
}

export const useHistoryModal = create<useHistoryModalState>()((set) => ({
  setIsHistoryModalOpen: (isHistoryModalOpen: boolean) => {
    set(() => ({
      isHistoryModalOpen,
    }));
  },
  isHistoryModalOpen: false,
}));
