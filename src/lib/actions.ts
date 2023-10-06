"use server"

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { scrapeProduct, validateAmazonUrl } from "@/lib/scraper";

const saveProduct = async (data: FormData) => {
    const url = data.get("url") as string
    const isValid = validateAmazonUrl(url)

    if (!isValid) return {
        message: "Invalid URL.",
    }

    if (url) {
        const res = await scrapeProduct(url)
        if (!res) throw new Error("Error scraping product.")

        let productExists = await prisma.product.findFirst({
            where: {
                url: res.url,
            },
        })
        if (!productExists) {
            productExists = await prisma.product.create({
                data: {
                    ...res,
                    highestPrice: res.price,
                    lowestPrice: res.price,
                }
            })

        } else {
            const product = {
                ...productExists,
                highestPrice: Math.max(res.price, productExists.highestPrice),
                lowestPrice: Math.min(res.price, productExists.lowestPrice),
                price: res.price,
            }

            await prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    highestPrice: product.highestPrice,
                    lowestPrice: product.lowestPrice,
                    price: product.price,
                }
            })
        }

        redirect(`/products/${productExists.id}`)
    }

}
export { saveProduct }