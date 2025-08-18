import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const AppNavbar = () => {
    return (
        <div className=' px-4 py-2 shadow-md w-full flex justify-between items-center '>
            <SidebarTrigger className="cursor-pointer"/>
            <UserButton/>
        </div>
    )
}

export default AppNavbar