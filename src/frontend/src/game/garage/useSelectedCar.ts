import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CAR_LIBRARY, type CarVariant } from './carLibrary';

interface SelectedCarState {
  selectedCarIndex: number;
  setSelectedCar: (index: number) => void;
  getSelectedCar: () => CarVariant;
  nextCar: () => void;
  previousCar: () => void;
}

export const useSelectedCar = create<SelectedCarState>()(
  persist(
    (set, get) => ({
      selectedCarIndex: 0,
      setSelectedCar: (index) => set({ selectedCarIndex: index }),
      getSelectedCar: () => CAR_LIBRARY[get().selectedCarIndex],
      nextCar: () =>
        set((state) => ({
          selectedCarIndex: (state.selectedCarIndex + 1) % CAR_LIBRARY.length,
        })),
      previousCar: () =>
        set((state) => ({
          selectedCarIndex:
            (state.selectedCarIndex - 1 + CAR_LIBRARY.length) % CAR_LIBRARY.length,
        })),
    }),
    {
      name: 'selected-car-storage',
    }
  )
);
