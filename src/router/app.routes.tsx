import { lazy } from "react";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { createBrowserRouter, Navigate } from "react-router";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

export const appRouter = createBrowserRouter([

    {
        path: '/',
        element: <HeroesLayout/>,
        children: [
            {
                path: '',
                element: <HomePage></HomePage>
            },
            {
                path: 'heroes/:idSlug',
                element: <HeroPage/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: '*',
                // element: <h1>404 - NOT FOUND</h1>
                element: <Navigate to={'/'}/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                path: '',
                element: <AdminPage/>
            },
        ]
    }
])