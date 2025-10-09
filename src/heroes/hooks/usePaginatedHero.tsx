import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHero = (page: number, limit:number = 6, category:string = 'all') => {

    return useQuery({
        queryKey: ['heroes', {page, limit, category}],
        queryFn: () => getHeroesByPageAction(Number(page), +limit, category),
        staleTime: 1000 * 60 * 5
    });

}
