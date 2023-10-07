import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { scrapeProduct } from "@/lib/scraper"
import { Product } from "@prisma/client"
import { createTransport } from "nodemailer"
import returnHtml from "@/lib/html"

export const POST = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get('x-auth-token')
        if (authHeader !== process.env.CRON_AUTH_TOKEN) {
            return new Response("Unauthorized", { status: 401 })
        }

        const products = await prisma.product.findMany()
        await Promise.all(products.map(async product => {
            // Scrape product and compare the product price with the current price as well as the stock status, if there is a change, update the product and log out the email subscribers
            const scrapedProduct = await scrapeProduct(product.url)

            if (!scrapedProduct) return
            const newProduct: Partial<Product> = {}

            if (scrapedProduct.price !== product.price) {
                newProduct.price = scrapedProduct.price
            }

            if (scrapedProduct.stockStatus !== product.stockStatus) {
                newProduct.stockStatus = scrapedProduct.stockStatus
            }

            if (scrapedProduct.isInSale !== product.isInSale) {
                newProduct.isInSale = scrapedProduct.isInSale
            }

            if (scrapedProduct.originalPrice !== product.originalPrice) {
                newProduct.originalPrice = scrapedProduct.originalPrice
            }

            if (scrapedProduct.rating !== product.rating) {
                newProduct.rating = scrapedProduct.rating
            }

            if (scrapedProduct.ratingCount !== product.ratingCount) {
                newProduct.ratingCount = scrapedProduct.ratingCount
            }

            const scrappedPrice = scrapedProduct.price
            if (scrappedPrice > product.highestPrice) {
                newProduct.highestPrice = scrappedPrice;
            }
            if (scrappedPrice < product.lowestPrice) {
                newProduct.lowestPrice = scrappedPrice;
            }

            if (Object.keys(newProduct).length > 0) {
                await prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: newProduct
                })
            }

            const subscribers = await prisma.subscription.findMany({
                where: {
                    productId: product.id
                }
            })

            if (Object.keys(newProduct).length > 0 && subscribers.length) {
                await Promise.all(subscribers.map(async subscriber => {
                    const transporter = createTransport({
                        service: "gmail",
                        host: "smtp.gmail.com",
                        auth: {
                            user: "najetak.viktrixeu@gmail.com",
                            pass: process.env.GMAIL_PASSWORD
                        }
                    })

                    await transporter.sendMail({
                        from: "najetak.viktrixeu@gmail.com",
                        to: subscriber.email,
                        subject: "Product price change",
                        html: returnHtml(product.title, `${process.env.PUBLIC_URL}/products/${product.id}`)
                    })
                }))
            }
        }))

        return new Response("Ok", { status: 200 })
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}