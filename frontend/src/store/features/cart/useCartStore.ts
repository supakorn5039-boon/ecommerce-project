import type { CartItem } from '@/types/Cart';
import { create } from 'zustand';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      const updatedItems = existing
        ? state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { ...item, quantity: 1 }];
      return { items: updatedItems, isCartOpen: true };
    }),

  updateQuantity: (id: number, quantity: number) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),

  removeFromCart: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set({ isCartOpen: false }),
}));
