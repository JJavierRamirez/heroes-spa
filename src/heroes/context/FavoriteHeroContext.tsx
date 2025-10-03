import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext{
    // State
    favorites: Hero[];
    favoriteCount:  number;

    // Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;

}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
        return JSON.parse(favoritesString) || [];
    }
    return [];
};

export const FavoriteHeroProvider = ({children}: PropsWithChildren) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

    const isFavorite = (hero: Hero): boolean => {
        return favorites.some(favHero => favHero.id === hero.id);
    };

    const toggleFavorite = (hero: Hero): void => {
        const heroExists = favorites.find(h => h.id === hero.id);
        
        if (heroExists) {
            setFavorites(favorites.filter(favHero => favHero.id !== hero.id));
            return;
        } 
        else {
            setFavorites([...favorites, hero]);
        }
    };

    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])
    


  return (
    <FavoriteHeroContext.Provider
        value={
            {
                // State
                favorites,
                favoriteCount: favorites.length,
                // Methods
                isFavorite,
                toggleFavorite
            }
        }
    >
        {children}
    </FavoriteHeroContext.Provider>
  )
}
