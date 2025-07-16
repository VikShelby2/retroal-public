"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-espresso/50" />
        <input
          type="text"
          placeholder="Search for vintage pieces..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3 border-2 border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory text-espresso transition-colors"
        />
        {searchQuery && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-espresso/50 hover:text-rust transition-colors"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
