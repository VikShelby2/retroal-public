"use client"
import { useState } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "../contexts/CartContext"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { state, toggleCart } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm("")
      setIsSearchOpen(false)
    }
  }

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchTerm("")
    }
  }

  return (
    <motion.header
      className="bg-black backdrop-blur-sm border-b border-warm-brown/20 sticky top-0 z-50"
    >
      <div className="container py-2 mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className=" text-2xl flex items-center gap-1 font-bold text-white">
            <Image src={"/logo.png"} alt="logo" width={60} height={60} />
            <motion.span whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              Retroshop.al
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Shop All", "Collections"].map((item) => (
              <motion.div key={item} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white hover:text-white transition-colors duration-300 font-medium"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} className='flex items-center' whileTap={{ scale: 0.95 }}>
              <button onClick={handleSearchIconClick} className="flex items-center" aria-label="Search">
                <Search className="w-5 h-5 text-white hover:text-white cursor-pointer transition-colors" />
              </button>
            </motion.div>
           
            

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative flex items-center">
              <button onClick={toggleCart} className="flex items-center" aria-label="Open shopping cart">
                <ShoppingBag className="w-5 h-5 text-white hover:text-white cursor-pointer transition-colors" />
              </button>
              <AnimatePresence>
                {state.totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium"
                  >
                    {state.totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            {/* Mobile menu button */}
            <motion.button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }}>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="py-4 border-t border-warm-brown/20"
            >
              <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                <motion.input
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search vintage treasures..."
                  className="w-full pl-4 pr-12 py-3 border border-white rounded-sm bg-black text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white/30"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute right-2 top-[10px] transform -translate-y-1/2 p-2 text-white hover:text-white transition-colors"
                  aria-label="Submit search"
                >
                  <Search className="w-4 h-4" />
                </motion.button>
              </form>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-center text-sm text-white mt-2"
              >
                Press Enter to search or click the search icon to close
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-warm-brown/20"
            >
              <nav className="flex flex-col space-y-4">
                {["Home", "Shop All", "Collections"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-white hover:text-white transition-colors duration-300 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Search */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t border-warm-brown/10"
                >
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search vintage treasures..."
                      className="w-full pl-4 pr-12 py-2 border border-warm-brown/20 rounded-sm text-black bg-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-black transition-colors"
                      aria-label="Submit search"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
