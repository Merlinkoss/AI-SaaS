import { create } from "zustand"

interface userPromocodeModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const userPromocodeModal = create<userPromocodeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))