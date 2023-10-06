"use server"

import { ScrappedProduct } from "@/types/product";
import axios from "axios"
import * as cheerio from "cheerio"

const convertPriceStringToNumber = (priceStr: string): number => {
    const cleanedStr = priceStr.replace(/[^0-9\.]/g, '');  // Remove everything except numbers and decimal point
    const floatVal = parseFloat(cleanedStr);  // Convert the cleaned string to a float
    return Math.floor(floatVal);  // Convert the float to an integer
}

export const validateAmazonUrl = (urlString: string) => {
    try {
        const url = new URL(urlString);
        const amazonRegex = /^www\.amazon\.com$/;
        return amazonRegex.test(url.hostname);
    } catch (error) {
        return false;  // If the URL is invalid, return false.
    }
}

const extractUsingSelectors = (html: string, selectors: string[]): string | null => {
    const $ = cheerio.load(html);

    for (const selector of selectors) {
        const element = $(selector);
        if (element && element.length > 0) {
            return element.text().trim();
        }
    }

    return null;
};

const extractText = (data: string) => {
    const regex = /(\d+)/g;
    const match = data.match(regex);
    if (match) {
        return parseInt(match[0]);
    }
    return 0;
}

const scrapeProduct = async (productUrl: string) => {
    try {
        const response = await axios.get(productUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://www.google.com/'
            }
        })

        if (response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)

            const productTitle = $('#productTitle').text().trim();
            const price = extractUsingSelectors(html, [
                "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen",
                "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span.a-offscreen"
            ]);
            const stockStatus = $('#availability > span').text().trim();
            const originalPrice = $('#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.aok-relative > span > span > span.a-offscreen').text().trim();
            const isInSale = originalPrice !== ""

            const listItems = $('#feature-bullets span.a-list-item');

            let productDescription = '';
            listItems.each((_, element) => {
                productDescription += $(element).text().trim() + ' ';
            });

            const productImageUrl = $('#landingImage').attr('data-old-hires');

            const rating = $('#acrPopover > span.a-declarative > a > span').text().trim();

            const ratingCount = $('#acrCustomerReviewText').text().trim();

            return {
                title: productTitle,
                description: productDescription,
                price: convertPriceStringToNumber(price!),
                stockStatus,
                isInSale,
                originalPrice: convertPriceStringToNumber(originalPrice),
                url: productUrl,
                productImageUrl,
                rating: convertPriceStringToNumber(rating),
                ratingCount: extractText(ratingCount)
            } as ScrappedProduct
        }
    } catch (error) {
        console.error("Error scraping product: ", error)
        throw new Error("Error scraping product")
    }
}

export { scrapeProduct }