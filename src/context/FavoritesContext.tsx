import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  FAVORITES_STORAGE_KEY,
  FavoritesContext,
  readStoredFavorites,
  type FavoriteCar,
  type FavoritesContextValue,
} from "./favorites";

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteCar[]>(readStoredFavorites);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch {
      // Storage can be unavailable (private mode, quota) — the app still works.
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.some((car) => car.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((car: FavoriteCar) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === car.id);

      return exists
        ? current.filter((item) => item.id !== car.id)
        : [car, ...current];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      count: favorites.length,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
