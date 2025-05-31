import { create } from 'zustand';
import { Product } from '../data/mockData';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (product, size, quantity) => set((state) => {
    const existingItem = state.items.find(i => i.id === product.id && i.size === size);
    const price = product.price[size as keyof typeof product.price] || product.price.medium;
    
    if (existingItem) {
      return {
        items: state.items.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      };
    }
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: price,
      image: product.image,
      size: size,
      quantity: quantity
    };
    
    return { items: [...state.items, cartItem] };
  }),
  
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  })),
  
  clearCart: () => set({ items: [] }),
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
})); 