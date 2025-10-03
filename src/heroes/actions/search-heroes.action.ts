import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Option {
    name?: string,
    team?: string,
    category?: string,
    universe?: string,
    status?: string,
    strength?: string
}

export const searchHeroesAction = async(params: Option) => {
    const { name, category, status, strength, team, universe } = params;

    if (!name && !category && !status && !strength && !team && !universe) {
        return [];
    }

    const { data } = await heroApi.get<Hero[]>(`/search`,{
        params: {
            name,
            category,
            status,
            strength,
            team,
            universe
        }
    });

    const heroes = data.map( hero => ({
        ...hero,
        image: `${ BASE_URL }/images/${ hero.image }`
    }));
  
    return heroes;
}
