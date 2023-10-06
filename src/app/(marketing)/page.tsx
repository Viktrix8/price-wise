import Form from "@/components/form";
import Image from "next/image";

export default function Home() {
  return (
    <div className='container p-4 py-48 grid grid-cols-2 justify-items-end'>
      <div>
        <h1 className="font-bold text-4xl leading-snug">Master Your Savings <br /> The Ultimate Price Tracker <br /> Experience!</h1>
        <p className="text-lg max-w-prose text-muted-foreground mt-2">Unlock the power of real-time price monitoring with our cutting-edge tracker. Never miss a deal, always stay ahead of the market, and master your savings journey.</p>
        <Form />
      </div>
      <Image className="relative bottom-16" alt="illutration" src="/hero.svg" width={600} height={600} />
    </div>
  )
}
