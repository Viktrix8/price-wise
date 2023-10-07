import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { scrapeProduct } from "@/lib/scraper"

export const POST = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get('x-auth-token')
        if (authHeader !== process.env.CRON_AUTH_TOKEN) {
            return new Response("Unauthorized", { status: 401 })
        }

        const products = await prisma.product.findMany()
        await Promise.all(products.map(async product => {
            const newProduct = await scrapeProduct(product.url)

            if (!newProduct) return

            if (product.highestPrice < newProduct.price) {
                await prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        highestPrice: newProduct.price,
                        price: newProduct.price,
                    }
                })
            }
            if (product.lowestPrice > newProduct.price) {
                await prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        lowestPrice: newProduct.price,
                        price: newProduct.price,
                    }
                })
            }

            await prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    stockStatus: newProduct.stockStatus,
                    isInSale: newProduct.isInSale,
                    originalPrice: newProduct.originalPrice,
                    rating: newProduct.rating,
                    ratingCount: newProduct.ratingCount,
                }
            })
        }))

        return new Response("Ok", { status: 200 })
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}