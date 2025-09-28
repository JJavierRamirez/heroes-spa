import { Link } from "react-router";
import { SlashIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {

    return (
        <>
            <Breadcrumb className="mt-5">
                <BreadcrumbList>
                    {
                        breadcrumbs.map((crumb, i) => (
                            <div key={i}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to={crumb.to}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <SlashIcon />
                                </BreadcrumbSeparator>    
                                {/* <BreadcrumbItem>
                                    <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
                                </BreadcrumbItem>                        */}
                            </div>
                        ))
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}
