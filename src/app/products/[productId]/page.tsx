import { Button, buttonVariants } from "@/components/ui/button"
import { AreaChart, ArrowBigDown, ArrowBigUp, MessageSquare, Star, Tag } from "lucide-react"
import Link from "next/link"

type Props = {}

export default function page({ }: Props) {
    return (
        <div className="container p-4 py-24">
            <div className="grid grid-cols-2 gap-6">
                <div className="border flex items-center justify-center">
                    <img className="object-contain" src="https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SX679_.jpg" />
                </div>
                <div>
                    <p className="font-bold text-4xl mb-6 line-clamp-4">Apple 2022 MacBook Air M2 Chip (13-inch, 8GB RAM, 256GB SSD Storage) (QWERTY English) Midnight (Renewed Premium)</p>
                    <a href="/" target="_blank" referrerPolicy="no-referrer" className="text-muted-foreground">
                        Visit Product
                    </a>
                    <hr className="my-6" />
                    <div className="flex flex-col">
                        <div className="flex gap-12 items-center">
                            <p className="text-2xl font-bold">$ 1,200</p>
                            <div className="flex items-center gap-4">
                                <Link href='/' className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
                                    <Star className="w-6 h-6 mr-2" />
                                    <span>100 reviews</span>
                                </Link>
                                <Link href='/' className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
                                    <MessageSquare className="w-6 h-6 mr-2" />
                                    <span>100 reviews</span>
                                </Link>
                            </div>
                        </div>
                        <p className="line-through text-muted-foreground text-xl mt-4">$ 899</p>
                    </div>
                    <hr className="my-6" />
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 grid-rows-2 gap-4">
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Current Price</span>
                                <div className="flex gap-2 items-center">
                                    <Tag />
                                    <span className="font-bold text-2xl">$ 1,200</span>
                                </div>
                            </div>
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Average Price</span>
                                <div className="flex gap-2 items-center">
                                    <AreaChart />
                                    <span className="font-bold text-2xl">$ 1,200</span>
                                </div>
                            </div>
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Highest Price</span>
                                <div className="flex gap-2 items-center">
                                    <ArrowBigUp />
                                    <span className="font-bold text-2xl">$ 1,200</span>
                                </div>
                            </div>
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Lowest Price</span>
                                <div className="flex gap-2 items-center">
                                    <ArrowBigDown />
                                    <span className="font-bold text-2xl">$ 1,200</span>
                                </div>
                            </div>
                        </div>
                        <Button className="mt-4 rounded-full">Track</Button>
                    </div>
                </div>
            </div>
            <hr className="my-6" />
            <p className="font-semibold text-lg">Product Description</p>
            <p className="text-muted-foreground">description...</p>
        </div>
    )
}