import Link from "next/link"
import { PercentDiamond } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className="border-b ">
            <div className="container p-4 items-center flex justify-between">
                <Link href="/" className="flex gap-2">
                    <PercentDiamond className="w-6 h-6" />
                    <span className="font-bold">PriceWise</span>
                </Link>
                <ThemeToggle />
            </div>
        </div>
    )
}