import { create } from "zustand";
import { HistoryProps } from "../components/history.tsx";
import { TicketProps } from "../components/ticket.tsx";

interface State {
  isAppMuted: boolean;
  setIsAppMuted: (isAppMuted: boolean) => void;
  showHotCold: boolean;
  setShowHotCold: (showHotCold: boolean) => void;
  setIsGameStarted: (isGameStarted: boolean) => void;
  setIsGameStarting: (isGameStarting: boolean) => void;
  isGameStarting: boolean;
  isGameStarted: boolean;
  selectedBalls: number[];
  setSelectedBalls: (selectedBalls: number[]) => void;
  addToGlobalActiveBalls: (ball: number) => void;
  clearGlobalActiveBalls: () => void;
  generateRandomNumbers: () => void;
  addTicket: (ticket: TicketProps) => void;
  setTickets: (tickets: TicketProps[]) => void;
  addToHistory: (history: HistoryProps) => void;
  numbers: number[];
  globalActiveBalls: number[];
  history: HistoryProps[];
  tickets: TicketProps[];
  clearTickets: () => void;
  prevTickets: TicketProps[];
  clearHistory: () => void;
}

export const useStore = create<State>()((set) => ({
  setTickets: (tickets: TicketProps[]) => {
    set(() => ({
      tickets,
    }));
  },
  setIsAppMuted: (isAppMuted: boolean) => {
    set(() => ({
      isAppMuted,
    }));
  },
  setShowHotCold: (showHotCold: boolean) => {
    set(() => ({
      showHotCold,
    }));
  },
  addToGlobalActiveBalls: (ball: number) => {
    set((state) => ({
      globalActiveBalls: [...state.globalActiveBalls, ball],
    }));
  },
  setIsGameStarting: (isGameStarting: boolean) => {
    set(() => ({
      isGameStarting,
    }));
  },
  clearGlobalActiveBalls: () => {
    set(() => ({
      globalActiveBalls: [],
    }));
  },
  generateRandomNumbers: () => {
    set(() => {
      const generatedNumbers = new Set<number>();

      while (generatedNumbers.size < 20) {
        const randomNumber = Math.floor(Math.random() * 80) + 1;
        generatedNumbers.add(randomNumber); // Добавляем число в Set для гарантии уникальности
      }

      return {
        numbers: Array.from(generatedNumbers), // Преобразуем Set в массив и обновляем состояние
      };
    });
  },
  addToHistory: (history: HistoryProps) => {
    set((state) => ({
      history: [...state.history, history],
    }));
  },
  addTicket: (ticket: TicketProps) => {
    set((state) => ({
      tickets: [...state.tickets, ticket],
    }));
  },
  setSelectedBalls: (selectedBalls: number[]) => {
    set(() => ({
      selectedBalls,
    }));
  },
  clearTickets: () => {
    set((state) => ({
      prevTickets: state.tickets,
      tickets: [],
    }));
  },
  clearHistory: () => {
    set(() => ({
      history: [],
    }));
  },
  setIsGameStarted: (isGameStarted: boolean) => {
    set(() => ({
      isGameStarted,
    }));
  },
  isAppMuted: false,
  isGameStarting: false,
  numbers: [],
  history: [],
  prevTickets: [],
  tickets: [],
  globalActiveBalls: [],
  selectedBalls: [],
  isGameStarted: false,
  showHotCold: true,
}));
