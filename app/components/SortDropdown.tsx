"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface SortDropdownProps {
  sortBy: string
  setSortBy: (sort: string) => void
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name: A to Z" },
]

export default function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = sortOptions.find((option) => option.value === sortBy)

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 bg-cream border border-espresso/20 px-4 py-2 rounded-sm text-espresso hover:border-rust transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm">Sort: {selectedOption?.label}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-ivory border border-espresso/20 rounded-sm shadow-lg z-20"
          >
            {sortOptions.map((option) => (
              <motion.button
                key={option.value}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-cream transition-colors ${
                  sortBy === option.value ? "bg-rust/10 text-rust font-medium" : "text-espresso"
                }`}
                onClick={() => {
                  setSortBy(option.value)
                  setIsOpen(false)
                }}
                whileHover={{ x: 4 }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
