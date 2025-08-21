"use client"

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

const linkStyle = "hidden md:block transition-all duration-300 hover:underline hover:text-sky-600"

const Navbar = () => {
    const {user} = useUser();

    return (
        <div className="px-8 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="font-semibold text-2xl capitalize cursor-pointer"> kids <span className="text-sky-600">story</span> </h1>

                <div className="flex gap-4 items-center capitalize navLinks">
                    <Link className={`${linkStyle}`} href="/">home</Link>
                    <Link className={`${linkStyle}`} href="/create-story">create story</Link>
                    <Link className={`${linkStyle}`} href="/explore-stories">explore stories</Link>

                    <Link className={`${linkStyle}`} href="/contact">contact us</Link>
                    {user && <Link className={`${linkStyle}`} href="/dashboard">dashboard</Link>}

                    {/* this section it will show just when user signed-in */}
                    <SignedIn>
                        <UserButton></UserButton>
                    </SignedIn>

                    {/* this section it will show just when user not signed-in */}
                    <SignedOut>
                        <Link className="btn-main" href="/sign-in">get started</Link>
                    </SignedOut>
                </div>
            </div>
        </div>
    )
}

export default Navbar