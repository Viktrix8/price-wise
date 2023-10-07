import { SubscriptionValidator } from "@/types/validators/subscription";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db"
import { z } from "zod";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()

        const { email, productId } = SubscriptionValidator.parse(body)

        const productExists = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (!productExists) {
            return new Response("Product not found", { status: 404 })
        }

        const subscriptionExists = await prisma.subscription.findUnique({
            where: {
                email_productId: {
                    email,
                    productId
                }
            }
        })

        if (subscriptionExists) {
            return new Response("Subscription already exists", { status: 409 })
        }

        await prisma.subscription.create({
            data: {
                email,
                productId
            }
        })

        return new Response("Ok", { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.issues[0].message, { status: 400 })
        }

        console.log(error)
        return new Response("Unexpected Error occured, please try again later.", { status: 500 })
    }
}