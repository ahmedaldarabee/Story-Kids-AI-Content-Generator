import { Button } from "@/components/ui/button"
import Image from "next/image"
const Banner = () => {
    return (
        <div className="bg-gradient-to-r from-gray-500 to-sky-500 text-white rounded-md">
            <div className="w-full container mx-auto flex justify-between items-center p-4">
                <div className="space-y-3">
                    <h2 className="font-semibold">Every Tap Unlocks a New World!</h2>

                    <p className="max-w-lg text-sm">Let your child explore enchanted lands and heroic quests—AI brings their next adventure to life in seconds.</p>

                    <Button className="btn-main hover:!bg-sky-500 hover:!px-10 transition-all duration-300">
                        Craft Your Magical Story
                    </Button>
                </div>
                
                <div>
                    <Image
                        width={300}
                        height={300}
                        src="/img/banner.png"
                        alt="banner kids image"
                        className="object-contain hidden md:block w-70 h-70"
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner