import { createContext, useContext } from "react";

export interface FavoriteCar {
  id: string;
  title: string;
  price: string;
  image: string;
  meta?: string;
  tag?: string;
  href: string;
}

export interface FavoritesContextValue {
  favorites: FavoriteCar[];
  count: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (car: FavoriteCar) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const FAVORITES_STORAGE_KEY = "dm-favorites";

export const isFavoriteCar = (value: unknown): value is FavoriteCar => {
  if (!value || typeof value !== "object") return false;

  const car = value as Record<string, unknown>;

  return (
    typeof car.id === "string" &&
    typeof car.title === "string" &&
    typeof car.price === "string" &&
    typeof car.image === "string" &&
    typeof car.href === "string"
  );
};

export const readStoredFavorites = (): FavoriteCar[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isFavoriteCar);
  } catch {
    return [];
  }
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
