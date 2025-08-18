"use client"

import { Button } from "@/components/ui/button"
import { Sidebar,SidebarContent,SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar"
import { LayoutDashboard, NotebookText, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

    const menuContent = [{
            id:1,
            name:"dashboard",
            path:"/dashboard",
            icon: LayoutDashboard
        },{
            id:2,
            name:"book",
            path:"/my-stories",
            icon: NotebookText
        },{
            id:3,
            name:"setting",
            path:"/setting",
            icon: Settings
        }
    ]
    const currentPath = usePathname();

    return (
        <Sidebar>

            <SidebarHeader className="flex items-center justify-center w-full text-center">
                <h1 className="font-semibold text-2xl capitalize cursor-pointer"> kids <span className="text-sky-600">story</span> </h1>
            </SidebarHeader>
                
                <SidebarContent>
                    
                    {/* First Group */}
                    <SidebarGroup>
                        <Button className="btn-main">generate your story</Button>
                    </SidebarGroup>

                    {/* Second Group  */}
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuContent.map((menu,idx) => (
                                    <SidebarMenuItem key={idx}>
                                        <SidebarMenuButton className={`cursor-pointer ${currentPath === menu.path ? 'border border-sky-400': ''}`}>
                                            <Link href={menu.path} className="flex items-center gap-x-1 cursor-pointer hover:text-sky-600 duration-300 transition-all">
                                                <span className="hover:rotate-45 duration-300 transition-all "> <menu.icon /> </span>
                                                <span className="capitalize"> {menu.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}