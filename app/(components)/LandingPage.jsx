import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row items-center justify-content-between container mx-auto'>

            {/* info */}
            <div className='max-w-lg space-y-6 capitalize'>
                <h1>generate your favorite stories with the ai</h1>

                <p className='text-gray-700 cursor-pointer hover:text-gray-500 transition-all ease-in-out'>
                    Ready to create a magical story? With our easy-to-use story creator, you can bring your imagination to life. Add your own characters, choose amazing illustrations, and write a unique tale that's all your own. It's time to become a storyteller!
                </p>

                <Link href="/create-story" className='bg-sky-600 text-white py-2 px-4 text-sm font-semibold hover:bg-sky-800 cursor-pointer transition-all rounded-md'>
                    create story
                </Link>
            </div>

            {/* image */}
            <div className='relative w-full h-[500px]'>
                <Image
                    src="/img/hero.png"
                    alt='kids image'
                    fill
                    className='object-contain'
                    priority={true}
                />
            </div>
        </div>
    )
}

export default LandingPage