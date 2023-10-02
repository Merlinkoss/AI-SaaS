"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import GenerationCounter from "./generation-counter";
import { CODE, CONVERSATION, DASHBOARD, GRAMMAR, IMAGE, MUSIC, SETTINGS, THERAPIST, VIDEO } from "@/app/features";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

const routes = [
    DASHBOARD,
    CONVERSATION,
    IMAGE,
    // VIDEO,
    // MUSIC,
    GRAMMAR,
    THERAPIST,
    CODE,
    SETTINGS
]

interface SidebarProps {
    currentApiUsage: number;
    maxAvailableApi: number;
}

const Sidebar = ({
    currentApiUsage = 0,
    maxAvailableApi = 1
}: SidebarProps) => {
    const pathname = usePathname()
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="logo"
                            src="/logo.png"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        LampoAI
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <GenerationCounter
                currentApiUsage={currentApiUsage}
                maxAvailableApi={maxAvailableApi}
            />
        </div>
    );
};

export default Sidebar;