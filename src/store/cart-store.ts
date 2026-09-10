"use client";

import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { clampCartQuantity, mergeCartLines, sanitizeCartLines, type CartLine } from "@/lib/cart";

type CartState = {
  lines: CartLine[];
  addItem: (variantId: string, quantity: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};

const safeLocalStorage: StateStorage = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Storage access is optional; the in-memory cart remains available.
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      // Storage access is optional; the in-memory cart remains available.
    }
  },
};

function createCartState(set: (partial: Partial<CartState> | ((state: CartState) => Partial<CartState>)) => void, initialLines: readonly CartLine[] = []): CartState {
  return {
    lines: sanitizeCartLines(initialLines),
    addItem: (variantId, quantity) => set((state) => ({
      lines: mergeCartLines(state.lines, { variantId, quantity }),
    })),
    setQuantity: (variantId, quantity) => set((state) => ({
      lines: quantity < 1
        ? state.lines.filter((line) => line.variantId !== variantId)
        : state.lines.map((line) => (
          line.variantId === variantId ? { ...line, quantity: clampCartQuantity(quantity) } : line
        )),
    })),
    removeItem: (variantId) => set((state) => ({
      lines: state.lines.filter((line) => line.variantId !== variantId),
    })),
    clearCart: () => set({ lines: [] }),
  };
}

export function createCartStore(initialLines: readonly CartLine[] = []) {
  return createStore<CartState>()((set) => createCartState(set, initialLines));
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => createCartState(set),
    {
      name: "saan-market-cart",
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({ lines: state.lines }),
      merge: (persisted, current) => ({
        ...current,
        lines: sanitizeCartLines((persisted as { lines?: unknown } | undefined)?.lines),
      }),
    },
  ),
);
