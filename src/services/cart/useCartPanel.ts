import { create } from 'zustand'

export interface CartPanelState {
    isOpen: boolean;
    toggle: () => void;
    openPanel: () => void;
    closePanel: () => void;
}

export const useCartPanel = create<CartPanelState>((set) => ({
    isOpen: false,
    toggle: () => set(s => ({ isOpen: !s.isOpen })),
    openPanel: () => set({isOpen: true}),
    closePanel: () => set({isOpen: false}),
}))
