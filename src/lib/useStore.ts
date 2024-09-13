import { create } from "zustand";
import { HistoryProps } from "../components/history.tsx";
import { TicketProps } from "../components/ticket.tsx";

interface State {
  setIsGameStarted: (isGameStarted: boolean) => void;
  isGameStarted: boolean;
  selectedBalls: number[];
  setSelectedBalls: (selectedBalls: number[]) => void;
  addToGlobalActiveBalls: (ball: number) => void;
  clearGlobalActiveBalls: () => void;
  generateRandomNumbers: () => void;
  addTicket: (ticket: TicketProps) => void;
  addToHistory: (history: HistoryProps) => void;
  numbers: number[];
  globalActiveBalls: number[];
  history: HistoryProps[];
  tickets: TicketProps[];
  clearTickets: () => void;
  clearHistory: () => void;
}

export const useStore = create<State>()((set) => ({
  addToGlobalActiveBalls: (ball: number) => {
    set((state) => ({
      globalActiveBalls: [...state.globalActiveBalls, ball],
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
    set(() => ({
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
  numbers: [],
  history: [],
  tickets: [],
  globalActiveBalls: [],
  selectedBalls: [],
  isGameStarted: false,
}));
