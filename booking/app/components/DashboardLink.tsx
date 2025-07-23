"use client"
import { CalendarHeartIcon, HomeIcon, icons, LucideProps, Settings, User2 } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface iAppProps{
    id: number;
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const dashboardLink : iAppProps[] = [
    {
    id : 0, 
    name : "Event types",
    href : "/dashboard",
    icon : HomeIcon,
    },
    {
    id : 1,
    name : "Meetings",
    href : "/dashboard/meetings",
    icon : User2,
    },
    {
    id : 2,
    name : "Availabilty",
    href : "/dashboard/availability",
    icon : CalendarHeartIcon,
    },
    {
    id : 3,
    name : "Settings",
    href : "/dashboard/Settings",
    icon : Settings,
    }
];

export function DashboardLinkComponent(){
    const pathname = usePathname();
    return (
        <>
        {dashboardLink.map((link)=> (
            <Link className={cn(
                pathname === link.href
                ? "text-blue-500 bg-blue-100"
                : "text-mute-foreground hover:text-foreground",
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-500"
            )}
            key={link.id} 
            href={link.href}
            >
                <link.icon className="size-4 mr-2"/>
                {link.name}
            </Link>
        ))}
        </>
    );
}