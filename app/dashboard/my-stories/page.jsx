"use client"

import { useEffect, useState } from "react"
import Banner from "../_components/Banner"
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import animationImg from '/public/animations/searchimm.json'
import Lottie from "lottie-react";

const MyStories = () => {
    const [stories,setStories] = useState([]);
    const [loading,setLoading] = useState(false);

    const [searchTerm,setSearchTerm] = useState('');
    const [filterType,setFilterType] = useState('');
    const [filterAgeGroup,setFilterAgeGroup] = useState('')

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

    // filter section - try to understand how it works

    const filteredStories = stories.filter(story => {

        const matchesSearch = story?.content?.story?.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType   = filterType ? story.storyType === filterType : true;
        const matchesAge    = filterAgeGroup ? story.ageGroup === filterAgeGroup : true;

        return matchesSearch && matchesType && matchesAge
    })

    if(loading){
        return (
            <div className="flex gap-2 w-full min-h-screen items-center justify-center text-xl">
                <span className="text-sky-600">Please wait</span>
                <Loader2 className="animate-spin h-6 w-6 text-sky-600"/>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <Banner/>

            <div className="container mx-auto px-10 py-4">
                <h2 className="capitalize text-xl font-medium">my <span className="text-sky-600">stories</span> </h2>

                <div
                    className="flex flex-col sm:flex-row gap-4 my-6 justify-center items-center"
                >

                <input
                    type="text"
                    placeholder="search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="outline-none border border-sky-300 focus:border-sky-600 rounded-md px-3 py-2 sm:w-64"
                />

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border border-sky-300 rounded px-3 py-2 w-full sm:w-48"
                >
                    <option value="">All Types</option>
                    <option value="Education">Educational</option>
                    <option value="Bed Story">Bed Story</option>
                    <option value="history Story">history Story</option>
                    <option value="Story Book">Story Book</option>
                </select>
                
                <select
                    value={filterAgeGroup}
                    onChange={(e) => setFilterAgeGroup(e.target.value)}
                    className="border border-sky-300 rounded px-3 py-2 w-full sm:w-48"
                >
                    <option value="">All Ages</option>
                    <option value="0-2 Years">0-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="6-8 Years">6-8 Years</option>
                </select>

                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4">

                    {
                        filteredStories.length > 0 ? filteredStories.map((story,idx) => (
                        <Link
                            key={idx}
                            href={`/dashboard/story/${story.storyId}`}
                        >
                            <div 
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
                        </Link>
                        ))
                    :   (
                        <p className="w-full text-center col-span-full space-x-2 "> 
                            <Lottie
                                animationData={animationImg}
                                loop={true} 
                                style={{ height: 350, width: 350 }}
                            />
                        </p>
                    )
                    }
                </div>
            </div>

        </div>
    )
}

export default MyStories