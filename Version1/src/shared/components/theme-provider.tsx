import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

const ThemeProviderContext = createContext<{
    theme: string
    setTheme: (theme: string) => void
}>({
    theme: "system",
    setTheme: () => null,
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
}
