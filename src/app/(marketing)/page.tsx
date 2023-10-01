import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { scrapeProduct } from "@/lib/scraper";
import Image from "next/image";


export default function Home() {
  const trackProduct = async (data: FormData) => {
    "use server"

    try {
      const url = data.get("url") as string

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
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container p-4 py-48 grid grid-cols-2 justify-items-end'>
      <div>
        <h1 className="font-bold text-4xl leading-snug">Master Your Savings <br /> The Ultimate Price Tracker <br /> Experience!</h1>
        <p className="text-lg max-w-prose text-muted-foreground mt-2">Unlock the power of real-time price monitoring with our cutting-edge tracker. Never miss a deal, always stay ahead of the market, and master your savings journey.</p>
        <form action={trackProduct} className="mt-2">
          <div className="flex gap-2">
            <Input name="url" id="url" placeholder="https://amazon.com/..." type="text" />
            <Button className="px-6">Track</Button>
          </div>
        </form>
      </div>
      <Image className="relative bottom-16" alt="illutration" src="/hero.svg" width={600} height={600} />
    </div>
  )
}
