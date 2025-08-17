import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"

const linkStyle = "hidden md:block transition-all duration-300 hover:underline hover:text-sky-600"

const Navbar = () => {
    return (
        <div className="px-8 py-4 flex justify-between items-center shadow-md">

            <h1 className="font-semibold text-2xl capitalize cursor-pointer"> kids <span className="text-sky-600">story</span> </h1>

            <div className="flex gap-4 items-center capitalize navLinks">
                <Link className={`${linkStyle}`} href="/">home</Link>
                <Link className={`${linkStyle}`} href="/create-story">create story</Link>
                <Link className={`${linkStyle}`} href="/explore-stories">explore stories</Link>
                <Link className={`${linkStyle}`} href="/contact">contact us</Link>

                {/* this section it will show just when user signed-in */}
                <SignedIn>
                    <UserButton></UserButton>
                </SignedIn>

                {/* this section it will show just when user not signed-in */}
                <SignedOut>
                    <Link className="transition-all duration-300 rounded-md p-2 bg-sky-600 text-white hover:bg-sky-800 cursor-pointer text-sm" href="/sign-in">get started</Link>
                </SignedOut>
            </div>
        </div>
    )
}

export default Navbar