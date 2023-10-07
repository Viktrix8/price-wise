"use client"
import { SubscriptionRequest } from '@/types/validators/subscription'
import { Button } from './ui/button'
import { useMutation } from "@tanstack/react-query"
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from './ui/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Input } from './ui/input'

type Props = {
    productId: number
}

export default function SubscribeButton({ productId }: Props) {
    const [email, setEmail] = useState<string>("")

    const { mutate: subscribe, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscriptionRequest = {
                email,
                productId
            }

            const { data } = await axios.post("/api/subscription", payload)
            return data
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 409) {
                    toast({
                        title: "Oops!",
                        description: "You're already subscribed to this product.",
                        variant: "destructive"
                    })
                } else if (error.response?.status === 500) {
                    toast({
                        title: "Oops!",
                        description: "Something went wrong. Please try again later.",
                        variant: "destructive"
                    })
                } else if (error.response?.status === 404) {
                    toast({
                        title: "Oops!",
                        description: "This product doesn't exist.",
                        variant: "destructive"
                    })
                } else if (error.response?.status === 400) {
                    toast({
                        title: "Oops!",
                        description: "Please enter a valid email.",
                        variant: "destructive"
                    })
                }
            } else {
                toast({
                    title: "Oops!",
                    description: "Something went wrong. Please try again later.",
                    variant: "destructive"
                })
            }
        },
        onSuccess: () => {
            setEmail("")
            toast({
                title: "Success!",
                description: "You've subscribed to this product.",
            })
        }
    })
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="mt-4 rounded-full" isLoading={isLoading}>Track</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Do you want to subscribe to this product?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>We&apos;ll send you an email when the price drops. You can unsubscribe at any time.</p>
                        <Input placeholder='myemail@domain.com' value={email} onChange={(e) => setEmail(e.target.value)} className='my-2' type="email" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => subscribe()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}