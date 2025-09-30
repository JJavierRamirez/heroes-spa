import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";

export const CustomMenu = () => {

    const { pathname } = useLocation();
    
    const isActive = (path:string) => {
        return pathname === path;
    }

    return (
        <NavigationMenu className="py-5">
            <NavigationMenuList>
                {/* home */}
                <NavigationMenuItem>
                <NavigationMenuLink asChild className={ cn( isActive('/') && 'bg-slate-200', "rounded-md p-2")}>
                    <Link to="/">Home</Link>
                </NavigationMenuLink>
                </NavigationMenuItem>
                {/* Search */}
                <NavigationMenuItem>
                <NavigationMenuLink asChild className={ cn( isActive('/search') && 'bg-slate-200', " rounded-mdp-2")}>
                    <Link to="/search">Search hero</Link>
                </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
