"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect } from 'react'

const Provider = ({children}) => {
    const {user} = useUser();

    useEffect(() => {
        // To avoid user isn't defined problem, we will do this section: user && .., and this section in general when i want to work with difference data
        user && createNewUser()
    },[user]);

    const createNewUser = async () => {
        const result = await axios.post("/api/user",{
            name:user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
        });

        console.log('data after posted: ',result.data);
    }

    return (
        <>{children}</>
    )
}

export default Provider