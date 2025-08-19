import React from 'react'
import Banner from './_components/Banner'
import StoryList from './_components/StoryList'
import { Toaster } from 'sonner'
const Dashboard = () => {
    return (
        <div className='p-4'>
            <Toaster position="bottom-right" expand={true}/>
            <Banner/>
            <StoryList/>
        </div>
    )
}

export default Dashboard