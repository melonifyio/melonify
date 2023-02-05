import { create } from "zustand";

interface ModalState {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useStartCollectionModalStore = create<ModalState>((set) => ({
  open: false,
  handleOpen: () => set((state) => ({ open: true })),
  handleClose: () => set({ open: false }),
}));

export const useSchemSettingsModalStore = create<ModalState>((set) => ({
  open: false,
  handleOpen: () => set((state) => ({ open: true })),
  handleClose: () => set({ open: false }),
}));

export const useSubcollectionsSettingsModalStore = create<ModalState>(
  (set) => ({
    open: false,
    handleOpen: () => set((state) => ({ open: true })),
    handleClose: () => set({ open: false }),
  })
);
