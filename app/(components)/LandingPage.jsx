import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
    return (
        <div className=' flex flex-col-reverse md:flex-row items-center justify-content-between container mx-auto'>

            {/* info */}
            <div className='max-w-lg space-y-6 max-sm:px-4'>
                <h1 className='text-2xl capitalize space-x-2'>
                <span className='font-semibold text-sky-600 '>generate</span>
                your favorite stories with the ai</h1>

                <p className='text-gray-700 text-sm cursor-pointer hover:text-gray-500 transition-all ease-in-out'>
                    Ready to create a magical story? With our easy-to-use story creator, you can bring your imagination to life. Add your own characters, choose amazing illustrations, and write a unique tale that's all your own. It's time to become a storyteller!
                </p>

                <Link href="/create-story" className='btn-main'>
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