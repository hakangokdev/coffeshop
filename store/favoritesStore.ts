import { create } from 'zustand';

interface FavoritesStore {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  
  addToFavorites: (productId) => set((state) => ({
    favorites: [...state.favorites, productId]
  })),
  
  removeFromFavorites: (productId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== productId)
  })),
  
  isFavorite: (productId) => {
    const { favorites } = get();
    return favorites.includes(productId);
  },
})); 