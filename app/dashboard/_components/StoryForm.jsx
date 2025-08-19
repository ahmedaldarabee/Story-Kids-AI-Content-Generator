"use client"

import Image from 'next/image';
import React, { useState } from 'react'
import { clsx } from 'clsx';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const StoryForm = () => {
    const route = useRouter();
    const [storySubject,setStorySubject] = useState("");

    const storyType = [
        {id:1, name:"Story Book", src:"/img/storybook.png"},
        {id:2, name:"Education",  src:"/img/educational.png"},
        {id:3, name:"Bed Story",  src:"/img/bedstory.png"},
        {id:3, name:"history Story",  src:"/img/history.png"},
    ]
    const [ageGroup,setAgeGroup] = useState("");
    const [loading,setLoading] = useState(false);

    const [selectedType,setSelectedType] = useState();
    
    const handleSubmit = async () => {
        if(!storySubject.trim("") || !ageGroup || !selectedType){
            return;
        }else{
            setLoading(true);            
            try {
                const res = await fetch("/api/generate-story",{
                    method:"POST",
                    headers: { "Content-Type":"application/json"},
                    body: JSON.stringify({
                        storySubject,
                        storyType: selectedType,
                        ageGroup
                    })
                })

                if(!res.ok){
                    throw new Error("Sorry, Field in generation story");
                }                
                // if response success, send user into my-stories page
                route.push("/my-stories");
                setLoading(false);
            } catch (error) {
                toast.error(`Sorry, fetching error ${error}!`);
                setLoading(false);
            }
        }
    }

    return (
        <div className='bg-gray-50 p-4 space-y-4'>
            <div className='w-full min-h-screen container mx-auto'>
                <h1 className='text-xl font-semibold capitalize'>
                    <span className='text-sky-600'>create your</span>  magical story
                </h1>

                <div className='space-y-4'>
                    <label className='block'>Write the subject of your story</label>

                    <textarea
                        placeholder='Write here...'
                        value={storySubject}
                        onChange={(e) => setStorySubject(e.target.value)}
                        className='border border-sky-600 rounded-md w-full py-4 px-2 resize-none'
                    />
                </div>

                <div className='space-y-2'>
                    <h2 className='text-xl font-semibold capitalize'>1. story type</h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {storyType.map((type,idx) => (
                            <div
                                onClick={() => setSelectedType(type.name)}
                                className={clsx(
                                    'p-2 rounded-md transition-all duration-300 hover:shadow-md cursor-pointer hover:scale-90',
                                    'text-center flex flex-col items-center justify-center space-y-4',
                                    `${ selectedType === type.name ? 'grayscale-0': 'grayscale hover:grayscale-0'}`
                                )}
                                
                                key={idx}>
                                <Image
                                    src={type.src}
                                    width={200}
                                    height={200}
                                    className='object-cover'
                                    alt={type.name}
                                />
                                <span className='font-medium'> {type.name} </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className='space-y-2'>
                <h2 className='text-xl font-semibold capitalize'>2. story age</h2>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {
                            ["0-2 Years","3-5 Years","6-8 Years"].map((age,idx) => (
                                <div 
                                onClick={() => setAgeGroup(age)}
                                key={idx}
                                className={
                                    clsx(
                                        'cursor-pointer p-3 rounded-md border bg-gray-100 transition-all duration-300',
                                        `${ageGroup === age ? 'bg-sky-700 text-white':''}`,
                                        'hover:shadow-md'
                                    )
                                }>
                                    <span className='font-medium'>{age}</span>
                                </div>
                            ))
                        }
                </div>
            </div>

            <div className='w-full flex items-center justify-center'>
                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="btn-main my-2"
                >
                    {loading ? 'Generating...':'Generate your story'}
                </button>
            </div>
        </div>
    )
}

export default StoryForm