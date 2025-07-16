"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import FilterSidebar from "./FilterSidebar"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: any
  setFilters: (filters: any) => void
  onClearAll: () => void
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  onClearAll,
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-espresso/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-ivory z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-4 border-b border-espresso/10">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-espresso">Filters</h3>
                <motion.button
                  className="p-2 hover:bg-cream rounded-sm transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-espresso" />
                </motion.button>
              </div>
            </div>

            <div className="p-4">
              <FilterSidebar filters={filters} setFilters={setFilters} onClearAll={onClearAll} />
            </div>

            <div className="p-4 border-t border-espresso/10">
              <motion.button
                className="w-full bg-gold text-espresso py-3 rounded-sm font-medium hover:bg-opacity-90 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
