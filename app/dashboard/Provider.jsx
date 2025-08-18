import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/app-sidebar'
import AppNavbar from './_components/AppNavbar'

const DashboardProvider = ({children}) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full '>
                <AppNavbar/>
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DashboardProvider