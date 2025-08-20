"use client"

import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const StoryDetails = () => {

    const {storyId} = useParams();
    const [story,setStory] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        async function fetchStoryDetails(){
            setLoading(true);

            try {
                const res = await fetch(`/api/story-details?storyId=${storyId}`);

                if(!res.ok){
                    throw new Error("field to fetch story details")
                }

                const data = await res.json();
                console.log('data about story details',data);
                setStory(data);

            } catch (error) {
                console.error(error.message);
            } finally{
                setLoading(false);
            }
        }

        fetchStoryDetails();
    },[storyId]);

    if(loading){
        return (
            <div className="flex gap-2 w-full min-h-screen items-center justify-center text-xl">
                <span className="text-sky-600">Please wait</span>
                <Loader2
                    className="animate-spin h-6 w-6 text-sky-600"
                />
            </div>
        )
    }

    return (
        <div className='w-full p-4'>
            <div className='container mx-auto space-y-8'>

                <div className='w-full flex items-center gap-4'>
                    <div className='md:w-1/2 flex justify-center items-start flex-col md:flex-row gap-10 cursor-pointer'>
                        <img
                            src={story?.imageURL}
                            alt='story image'
                            className='rounded-lg shadow-lg object-cover w-full max-h-[350px]'
                        />
                    </div>

                    <div className='md:w-1/2 flex flex-col justify-start space-y-4'>
                        <h1 className='text-xl font-medium text-sky-600'>{story?.content?.story?.title}</h1>

                        <p className='text-xl'>
                            <strong>Type: </strong>
                            <span>{story?.content?.story?.type}</span>
                        </p>
                        
                        <p className='text-xl'>
                            <strong>Age Group: </strong>
                            <span>{story?.content?.story?.ageGroup}</span>
                        </p>
                        
                        <p className='text-xl'>
                            <strong>Description: </strong>
                            <span>{story?.content?.story?.description}</span>
                        </p>
                        
                    </div>
                </div>

                <div className='w-full my-4 text-center'>
                    <h3 className='font-medium capitalize text-xl'> <span className='text-sky-600'>story</span> chapters </h3>
                </div>

                <div className='w-full flex flex-col items-center justify-center gap-4 space-y-6 '>
                    {story?.content?.story?.pages?.map((page,idx) => (
                        <div
                            key={idx}
                            className='p-4 border hover:border-sky-600 transition-all duration-300 cursor-pointer hover:shadow-md space-y-2 rounded-md max-w-3xl'
                        >

                        <h3 className='hover:whitespace-normal hover:overflow-visible hover:max-w-full text-sky-600 font-semibold text-xl truncate max-w-[200px] transition-all duration-300'> Chapter {page.pageNumber}: {page.title}</h3>

                        <p className='text-gray-500 max-w-[300px] hover:text-gray-600 transition-all duration-300 cursor-pointer'
                        >{page.content}</p>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default StoryDetails