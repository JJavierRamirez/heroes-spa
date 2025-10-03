import { useSearchParams } from "react-router";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";

export const SearchPage = () => {

  // TODO: useQuery
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';
  const strength = searchParams.get('strength') ?? '';

  
  const { data: heroes = [] }= useQuery({
      queryKey: ['search', {name, strength}],
      queryFn: () => searchHeroesAction({name, strength}),
      staleTime: 1000 * 60 * 5,
      retry: false
  });

  return (
    <>
      <CustomJumbotron 
          title="Superhero Search" 
          description="Discover, explore, and manage your favorite superheroes and villains">
      </CustomJumbotron>

      <CustomBreadcrumbs currentPage="Search" breadcrumbs={
        [
          {label: 'Home', to: '/'},
          {label: 'Search', to: '/search'},
        ]
      }></CustomBreadcrumbs>

      {/* Stats Dashboard */}
      <HeroStats/>
      {/* {Filter and search} */}
      <SearchControls></SearchControls>

      <HeroGrid heroes={heroes}></HeroGrid>

    </>
  )
}

export default SearchPage;
