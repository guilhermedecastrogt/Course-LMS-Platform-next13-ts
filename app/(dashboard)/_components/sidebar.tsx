import {LogOut} from "lucide-react";
import {Logo} from "@/app/(dashboard)/_components/logo";
import {SidebarRoutes} from "@/app/(dashboard)/_components/sidebar-routes";

export const Sidebar = () => {
    return (
        <div className="bg-white h-full border flex flex-col overflow-auto shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
}