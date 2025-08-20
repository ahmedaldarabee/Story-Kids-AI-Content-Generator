import React from 'react'
import Banner from './_components/Banner'
import StoryList from './_components/StoryList'

const Dashboard = () => {
    return (
        <div className='p-4'>
            <Banner/>
            <StoryList/>
        </div>
    )
}

export default Dashboard