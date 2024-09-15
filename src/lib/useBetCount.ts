import { create } from "zustand";

interface useBetCountState {
  bet: number;
  incrementBet: () => void;
  decrementBet: () => void;
  resetBet: () => void;
}

export const useBetCount = create<useBetCountState>()((set) => ({
  bet: 1,
  incrementBet: () => {
    set((state) => ({
      bet: state.bet >= 9 ? 1 : state.bet + 1,
    }));
  },
  decrementBet: () => {
    set((state) => ({
      bet: state.bet <= 1 ? 10 : state.bet - 1,
    }));
  },
  resetBet: () => {
    set(() => ({
      bet: 0,
    }));
  },
}));
