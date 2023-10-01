import { Button, buttonVariants } from "@/components/ui/button"
import { prisma } from "@/lib/db"
import { price } from "@/lib/utils"
import { AreaChart, ArrowBigDown, ArrowBigUp, MessageSquare, Star, Tag } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
    params: {
        productId: string
    }
}

export default async function page({ params: { productId } }: Props) {
    const product = await prisma.product.findFirst({
        where: {
            id: parseInt(productId)
        }
    })

    if (!product) return notFound()

    return (
        <div className="container p-4 py-24">
            <div className="grid grid-cols-2 gap-6">
                <div className="border flex items-center justify-center">
                    <img className="object-contain" src={product.productImageUrl} />
                </div>
                <div>
                    <p className="font-bold text-4xl mb-6 line-clamp-4">{product.title}</p>
                    <a href={product.url} target="_blank" referrerPolicy="no-referrer" className="text-muted-foreground">
                        Visit Product
                    </a>
                    <hr className="my-6" />
                    <div className="flex flex-col">
                        <div className="flex gap-12 items-center">
                            <p className="text-2xl font-bold">{price(product.price)}</p>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" className="rounded-full">
                                    <Star className="w-6 h-6 mr-2" />
                                    <span>{product.rating} stars</span>
                                </Button>
                                <Button variant="outline" className="rounded-full">
                                    <MessageSquare className="w-6 h-6 mr-2" />
                                    <span>{product.ratingCount} reviews</span>
                                </Button>
                            </div>
                        </div>
                        {product.originalPrice && <p className="line-through text-muted-foreground text-xl mt-4">{price(product.originalPrice)}</p>}
                        <p className="mt-4 text-muted-foreground">{product.stockStatus}</p>
                    </div>
                    <hr className="my-6" />
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 grid-rows-2 gap-4">
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Data From</span>
                                <div className="flex gap-2 items-center">
                                    <AreaChart />
                                    <span className="font-bold text-2xl">{new Date(product.createdAt).toDateString()}</span>
                                </div>
                            </div>
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Current Price</span>
                                <div className="flex gap-2 items-center">
                                    <Tag />
                                    <span className="font-bold text-2xl">{price(product.price)}</span>
                                </div>
                            </div>
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Highest Price</span>
                                <div className="flex gap-2 items-center">
                                    <ArrowBigUp />
                                    <span className="font-bold text-2xl">{price(product.highestPrice)}</span>
                                </div>
                            </div>
                            <div className="border flex flex-col gap-2 p-4">
                                <span className="text-muted-foreground">Lowest Price</span>
                                <div className="flex gap-2 items-center">
                                    <ArrowBigDown />
                                    <span className="font-bold text-2xl">{price(product.lowestPrice)}</span>
                                </div>
                            </div>
                        </div>
                        <Button className="mt-4 rounded-full">Track</Button>
                    </div>
                </div>
            </div>
            <hr className="my-6" />
            <p className="font-semibold text-lg">Product Description</p>
            <p className="text-muted-foreground">{product.description}</p>
        </div>
    )
}