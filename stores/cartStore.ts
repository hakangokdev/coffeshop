import { create } from 'zustand';
import { CartItem, Product, ProductSize } from '../types';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (product: Product, size?: ProductSize, customizations?: string[]) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,

  addItem: (product, size, customizations) => {
    const { items } = get();
    const existingItemIndex = items.findIndex(
      item => item.product.id === product.id && 
      item.selectedSize?.name === size?.name
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      set({ items: updatedItems });
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
        selectedSize: size,
        customizations: customizations || [],
      };
      set({ items: [...items, newItem] });
    }

    // Calculate total
    const newTotal = get().items.reduce((sum, item) => {
      const price = item.selectedSize?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);
    set({ total: newTotal });
  },

  removeItem: (productId) => {
    const { items } = get();
    const updatedItems = items.filter(item => item.product.id !== productId);
    set({ items: updatedItems });

    // Recalculate total
    const newTotal = updatedItems.reduce((sum, item) => {
      const price = item.selectedSize?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);
    set({ total: newTotal });
  },

  updateQuantity: (productId, quantity) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const updatedItems = items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ items: updatedItems });

    // Recalculate total
    const newTotal = updatedItems.reduce((sum, item) => {
      const price = item.selectedSize?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);
    set({ total: newTotal });
  },

  clearCart: () => {
    set({ items: [], total: 0 });
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
})); 