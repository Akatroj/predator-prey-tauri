import { create } from 'zustand';

type RootState = {
  running: boolean;
  showMap: boolean;
  showGraph: boolean;
  setRunning: (running: boolean) => void;
  setShowMap: (showMap: boolean) => void;
  setShowGraph: (showGraph: boolean) => void;
};

export const useConfigStore = create<RootState>()(set => ({
  running: true,
  showMap: true,
  showGraph: true,
  setRunning(running) {
    set({ running });
  },
  setShowMap(showMap) {
    set({ showMap });
  },
  setShowGraph(showGraph) {
    set({ showGraph });
  },
}));
