"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Props = {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    return <NextThemesProvider attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {children}
    </NextThemesProvider>
}
