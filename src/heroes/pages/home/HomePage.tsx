import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useHeroSummary } from '../../hooks/useHeroSummary';
import { usePaginatedHero } from '@/heroes/hooks/usePaginatedHero';

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  // const [activeTab, setActiveTab] = useState<'all'|  'favorites'|  'heroes'|  'villains'>('all');
  const activeTab = searchParams.get('tab') ?? 'all'; 
  const page = searchParams.get('page') ?? '1'; 
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  // first version
  // useEffect(() => {
  //   getHeroesByPageAction().then(() => {
  //   })
  // }, []);
  // second version
  // const { data: heroesResponse } = useQuery({
  //   queryKey: ['heroes', {page, limit}],
  //   queryFn: () => getHeroesByPageAction(Number(page), +limit),
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();
    
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
                  prev.set('category','all');
                  prev.set('page','1');
                  return prev;  
                }
              )
            }>
              All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              onClick={
                () => setSearchParams((prev) => {
                  prev.set('tab','favorites');
                  prev.set('category','favorites');
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
                  prev.set('category','hero');
                  prev.set('page','1');
                  return prev;  
                }
              )
            }>Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger 
              value="villains" 
              onClick={
                () => setSearchParams((prev) => {
                  prev.set('tab','villains');
                  prev.set('category','villain');
                  prev.set('page','1');
                  return prev;  
                }
                )
              }
            >Villains ({summary?.villainCount})</TabsTrigger>
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
            <HeroGrid heroes = {heroesResponse?.heroes ?? []}></HeroGrid>
          </TabsContent>
          <TabsContent value="villains">
            {/* Show all villains */}
            <HeroGrid heroes = {heroesResponse?.heroes ?? []}></HeroGrid>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1}></CustomPagination>
      </>
    </>
  )
}
