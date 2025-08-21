"use client"
import React, { useState } from 'react'
import Lottie from 'lottie-react';
import animationImg from '/public/animations/newsmall.json'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const StoryList = () => {
    const [stories,setStories] = useState([]);
    const router = useRouter();

    return (
        <div className='w-full my-4'>
            <div className='container mx-auto'>

                <div className='flex  flex-col items-center gap-4'>
                
                    <h2 className='text-[20px] font-semibold'> <span className='text-sky-600'>Ready</span> to craft your next adventure? Start your story now!</h2>
                    {
                        stories.length === 0 ? (
                            <>
                                <div className='flex flex-col items-center justify-center space-y-4'>
                                    <Lottie
                                        animationData={animationImg}
                                        loop={true}
                                        style={{ height: 350, width: 350 }}
                                        />
                                    <Button onClick={() => router.push("/dashboard/new-story")} className="btn-main hover:!bg-sky-500 hover:!px-20 !px-10 transition-all duration-300">
                                        create story
                                    </Button>
                                </div>
                            </>
                        ) : (<>

                        </>)
                    }
                </div>
            </div>
        </div>
    )
}

export default StoryList