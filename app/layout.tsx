import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display, Cinzel } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./contexts/CartContext"
import CartDrawer from "./components/CartDrawer"
import StoreProvider from "@/context/StoreProvider"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
})

export const metadata: Metadata = {
  title: "Velvet Revival - Vintage Clothing Collection",
  description: "Discover timeless vintage fashion pieces curated for the modern wardrobe",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfair.variable} ${cinzel.variable} font-sans bg-ivory text-espresso antialiased`}
      >
        <StoreProvider>


        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider></StoreProvider>
      </body>
    </html>
  )
}
