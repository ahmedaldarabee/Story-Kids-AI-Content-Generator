"use client"

import React, { useState } from 'react'

const StoryForm = () => {
    const [storySubject,setStorySubject] = useState("")
    const [storyType,setStoryType] = useState(["Education Story","Story Book","Bed Story"]);
    const [ageGroup,setAgeGroup] = useState("");
    const [loading,setLoading] = useState(false);
    
    return (
        <div className='bg-gray-50 p-4 space-y-4'>
            <div className='w-full min-h-screen container mx-auto'>

                <h1 className='text-xl font-semibold capitalize'>
                    <span className='text-sky-600'>create your</span>  magical story
                </h1>

                <div className='space-y-4'>
                    <label className='block'>Write the subject of your story</label>

                    <textarea
                        value={storySubject}
                        onChange={(e) => setStorySubject(e.target.value)}
                        className='border border-sky-600 rounded-md w-full py-4 px-2 resize-none'
                    />
                </div>

                <div>
                    <h2 className='text-xl font-semibold capitalize'>story type</h2>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {storyType.map((type,idx) => (
                            <div
                                className='border p-2 rounded-md hover:border-sky-600 transition-all duration-300 hover:shadow-md cursor-pointer hover:scale-90 hover:bg-gray-100'
                                onClick={() => setStoryType(type)} key={idx}>
                                {type}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoryForm