import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesStore {
  favoriteIds: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],

  addToFavorites: async (productId) => {
    const { favoriteIds } = get();
    if (!favoriteIds.includes(productId)) {
      const newFavorites = [...favoriteIds, productId];
      set({ favoriteIds: newFavorites });
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  },

  removeFromFavorites: async (productId) => {
    const { favoriteIds } = get();
    const newFavorites = favoriteIds.filter(id => id !== productId);
    set({ favoriteIds: newFavorites });
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  },

  isFavorite: (productId) => {
    return get().favoriteIds.includes(productId);
  },

  loadFavorites: async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) {
        set({ favoriteIds: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  },
})); 