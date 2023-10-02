import { create } from "zustand"

interface usePaymentInProgressStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const usePaymentInProgressStore = create<usePaymentInProgressStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))