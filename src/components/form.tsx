"use client"
import { saveProduct } from "@/lib/actions"
import { Input } from "./ui/input"
import SubmitButton from "./submit-button"

type Props = {}

export default function Form({ }: Props) {
    return (
        <form action={saveProduct} className="mt-2">
            <div className="flex gap-2">
                <Input name="url" id="url" placeholder="https://amazon.com/..." type="text" />
                <SubmitButton />
            </div>
        </form>
    )
}