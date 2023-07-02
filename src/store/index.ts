import { create } from 'zustand';

type RootState = {
  running: boolean;
  setRunning: (running: boolean) => void;
};

export const useConfigStore = create<RootState>()(set => ({
  running: true,
  setRunning(running) {
    set({ running });
  },
}));
