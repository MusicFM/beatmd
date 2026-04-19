"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Beat, CartItem, License } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (beat: Beat, license: License) => void;
  removeItem: (beatId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  isInCart: (beatId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (beat, license) => {
        const existing = get().items.find((i) => i.beat.id === beat.id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.beat.id === beat.id ? { ...i, license } : i
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, { beat, license }] }));
        }
      },
      removeItem: (beatId) =>
        set((state) => ({ items: state.items.filter((i) => i.beat.id !== beatId) })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.license.price, 0),
      getItemCount: () => get().items.length,
      isInCart: (beatId) => get().items.some((i) => i.beat.id === beatId),
    }),
    { name: "beatmd-cart" }
  )
);
