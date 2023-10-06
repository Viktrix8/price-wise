"use client";

import { Button } from "./ui/button"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type Props = {}

export default function SubmitButton({ }: Props) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="px-6" aria-disabled={pending} isLoading={pending}>Track</Button>
    )
}