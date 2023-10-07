"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "./ui/toaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type Props = {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    const queryClient = new QueryClient()

    return <NextThemesProvider attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        <Toaster />
    </NextThemesProvider>
}
