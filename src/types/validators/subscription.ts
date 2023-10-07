import z from "zod"

export const SubscriptionValidator = z.object({
    email: z.string().email(),
    productId: z.number(),
})

export type SubscriptionRequest = z.infer<typeof SubscriptionValidator>