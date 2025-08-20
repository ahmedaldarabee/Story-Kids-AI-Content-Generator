"use client"

import { useEffect, useState } from "react"
import Banner from "../_components/Banner"
import clsx from "clsx";
import { Loader2 } from "lucide-react";

const MyStories = () => {
    const [stories,setStories] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        async function fetchStories(){
            setLoading(true);
            try {
                const res = await fetch("/api/my-stories")

                if(!res.ok){
                    throw new Error("Field to fetch story data");
                }

                const data = await res.json();
                setStories(data);
                console.log('data from ai : ',data)

            } catch (error) {
                console.log('error in fetching story data: ',error.message);
            } finally{
                setLoading(false);
            }
        }

        fetchStories();
    },[]);

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
        <div className="space-y-4">
            <Banner/>

            <div className="container mx-auto px-10 py-4">
                <h2 className="capitalize text-xl font-medium">my <span className="text-sky-600">stories</span> </h2>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4">

                    {stories.map((story,idx) => (
                        <div 
                            key={idx}
                            className={clsx(
                                'bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border hover:border-sky-600 space-y-2 p-2 cursor-pointer'
                            )}
                        >

                            <img
                                src={story?.imageURL}
                                alt="story image"
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4 bg-gray-100">
                                <h2 className="text-xl text-sky-600 font-semibold truncate">{story.content?.story?.title}</h2>

                                <strong className="text-lg block">{story.storyType}</strong>
                                <small className="block text-gray-500">{story.ageGroup}</small>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default MyStories