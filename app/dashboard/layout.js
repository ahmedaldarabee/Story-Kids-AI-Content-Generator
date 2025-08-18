import React from 'react'
import DashboardProvider from './Provider'

const layout = ({children}) => {
    return (
        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}

export default layout