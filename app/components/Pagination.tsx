"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      <motion.button
        className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors ${
          currentPage === 1 ? "text-espresso/40 cursor-not-allowed" : "text-espresso hover:bg-cream hover:text-rust"
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-espresso/50">...</span>
            ) : (
              <motion.button
                className={`px-3 py-2 rounded-sm transition-colors ${
                  currentPage === page
                    ? "bg-rust text-ivory font-medium"
                    : "text-espresso hover:bg-cream hover:text-rust"
                }`}
                onClick={() => onPageChange(page as number)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {page}
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors ${
          currentPage === totalPages
            ? "text-espresso/40 cursor-not-allowed"
            : "text-espresso hover:bg-cream hover:text-rust"
        }`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}
