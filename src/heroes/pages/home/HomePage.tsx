import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  // const [activeTab, setActiveTab] = useState<'all'|  'favorites'|  'heroes'|  'villains'>('all');
  const activeTab = searchParams.get('tab') ?? 'all'; 

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  // useEffect(() => {
  //   getHeroesByPageAction().then(() => {
  //   })
  // }, []);
  const { data: heroesResponse } = useQuery({
    queryKey: ['heroes'],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  // console.log(heroesResponse)

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron 
            title="Superhero Universe" 
            description="Discover, explore, and manage your favorite superheroes and villains">
        </CustomJumbotron>

        {/* Breadcrumb */}
        <CustomBreadcrumbs currentPage="Super Heroes" breadcrumbs={
          [
            { label: 'Home', to: '/'}
          ]
        }></CustomBreadcrumbs>

        {/* Stats Dashboard */}
        <HeroStats/>

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="all" 
              onClick={
                () => setSearchParams((prev) => {
                  prev.set('tab','all');
                  return prev;  
                }
              )
            }>
              All Characters ({heroesResponse?.total})</TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              onClick={
                () => setSearchParams((prev) => {
                  prev.set('tab','favorites');
                  return prev;  
                }
              )
            }>
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger 
              value="heroes" 
              onClick={
                () => setSearchParams((prev) => {
                  prev.set('tab','heroes');
                  return prev;  
                }
              )
            }>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setSearchParams('tab=villains')}>Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Show all characters */}
            <HeroGrid heroes = {heroesResponse?.heroes ?? []}></HeroGrid>
          </TabsContent>
          <TabsContent value="favorites">
            {/* Show all favorites */}
            <HeroGrid></HeroGrid>
          </TabsContent>
          <TabsContent value="heroes">
            {/* Show all heroes */}
            <HeroGrid></HeroGrid>
          </TabsContent>
          <TabsContent value="villains">
            {/* Show all villains */}
            <HeroGrid></HeroGrid>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={8}></CustomPagination>
      </>
    </>
  )
}
