import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const SearchPage = () => {
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
    </>
  )
}

export default SearchPage;
