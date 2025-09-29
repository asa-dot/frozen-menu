import { create } from "zustand";

interface FlavorState {
  activeFlavor: string | null;
  setActiveFlavor: (id: string) => void;
}

export const useFlavorStore = create<FlavorState>((set) => ({
  activeFlavor: null,
  setActiveFlavor: (id) => set({ activeFlavor: id }),
}));
