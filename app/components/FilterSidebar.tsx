"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  filters: any
  setFilters: (filters: any) => void
  onClearAll: () => void
}

export default function FilterSidebar({ filters, setFilters, onClearAll }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    size: true,
    color: false,
    era: false,
    condition: false,
    special: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  const categories = ["Outerwear", "Tops", "Bottoms", "Dresses", "Shoes", "Accessories"]
  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = [
    "Black",
    "Brown",
    "Blue",
    "Green",
    "Red",
    "White",
    "Multi",
    "Camel",
    "Tan",
    "Gold",
    "Floral",
    "Earth Tones",
  ]
  const eras = ["1950s", "1960s", "1970s", "1980s", "1990s"]
  const conditions = ["Excellent", "Very Good", "Good"]

  const FilterSection = ({ title, isExpanded, onToggle, children , isW   }: any) => (
    <div className="border-b border-espresso/10  mb-3 ">
      <motion.button
        className="flex items-center justify-between w-full text-left font-semibold text-espresso mb-4"
        onClick={onToggle}
        whileHover={{ x: 2 }}
      >
        {title}
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </motion.button>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn("overflow-hidden " , isW && 'mb-4')}
      >
        {children}
      </motion.div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-cream p-6 rounded-lg sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold text-espresso">Filters</h3>
        <motion.button
          className="text-sm text-rust hover:text-espresso underline"
          onClick={onClearAll}
          whileHover={{ scale: 1.05 }}
        >
          Clear All
        </motion.button>
      </div>

      {/* Categories */}
      <FilterSection
        title="Categories"
        isW={true}
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({ ...filters, categories: [...filters.categories, category] })
                  } else {
                    setFilters({
                      ...filters,
                      categories: filters.categories.filter((c: string) => c !== category),
                    })
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border-2 rounded-sm mr-3 transition-colors ${
                  filters.categories.includes(category)
                    ? "bg-rust border-rust"
                    : "border-espresso/30 group-hover:border-rust"
                }`}
              >
                {filters.categories.includes(category) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-ivory rounded-sm" />
                  </motion.div>
                )}
              </div>
              <span className="text-espresso group-hover:text-rust transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" isExpanded={expandedSections.price} onToggle={() => toggleSection("price")}>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [Number.parseInt(e.target.value) || 0, filters.priceRange[1]],
                })
              }
              className="w-20 px-3 py-2 border border-espresso/20 rounded-sm text-sm focus:outline-none focus:border-rust"
            />
            <span className="text-espresso/50">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], Number.parseInt(e.target.value) || 500],
                })
              }
              className="w-20 px-3 py-2 border border-espresso/20 rounded-sm text-sm focus:outline-none focus:border-rust"
            />
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
              })
            }
            className="w-full accent-rust"
          />
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection isW title="Size" isExpanded={expandedSections.size} onToggle={() => toggleSection("size")}>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <motion.button
              key={size}
              className={`px-3 py-2 border rounded-sm text-sm transition-colors ${
                filters.sizes.includes(size)
                  ? "border-rust bg-rust text-ivory"
                  : "border-espresso/30 text-espresso hover:border-rust"
              }`}
              onClick={() => {
                if (filters.sizes.includes(size)) {
                  setFilters({ ...filters, sizes: filters.sizes.filter((s: string) => s !== size) })
                } else {
                  setFilters({ ...filters, sizes: [...filters.sizes, size] })
                }
              }}
              
            >
              {size}
            </motion.button>
          ))}
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Color" isExpanded={expandedSections.color} onToggle={() => toggleSection("color")}>
        <div className="space-y-2">
          {colors.map((color) => (
            <label key={color} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({ ...filters, colors: [...filters.colors, color] })
                  } else {
                    setFilters({ ...filters, colors: filters.colors.filter((c: string) => c !== color) })
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border-2 rounded-sm mr-3 transition-colors ${
                  filters.colors.includes(color) ? "bg-rust border-rust" : "border-espresso/30 group-hover:border-rust"
                }`}
              >
                {filters.colors.includes(color) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-ivory rounded-sm" />
                  </motion.div>
                )}
              </div>
              <span className="text-espresso group-hover:text-rust transition-colors text-sm">{color}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Era */}
      <FilterSection title="Era" isExpanded={expandedSections.era} onToggle={() => toggleSection("era")}>
        <div className="space-y-2">
          {eras.map((era) => (
            <label key={era} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.eras.includes(era)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({ ...filters, eras: [...filters.eras, era] })
                  } else {
                    setFilters({ ...filters, eras: filters.eras.filter((e: string) => e !== era) })
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border-2 rounded-sm mr-3 transition-colors ${
                  filters.eras.includes(era) ? "bg-rust border-rust" : "border-espresso/30 group-hover:border-rust"
                }`}
              >
                {filters.eras.includes(era) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-ivory rounded-sm" />
                  </motion.div>
                )}
              </div>
              <span className="text-espresso group-hover:text-rust transition-colors">{era}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection
        title="Condition"
        isExpanded={expandedSections.condition}
        onToggle={() => toggleSection("condition")}
      >
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.conditions.includes(condition)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({ ...filters, conditions: [...filters.conditions, condition] })
                  } else {
                    setFilters({
                      ...filters,
                      conditions: filters.conditions.filter((c: string) => c !== condition),
                    })
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border-2 rounded-sm mr-3 transition-colors ${
                  filters.conditions.includes(condition)
                    ? "bg-rust border-rust"
                    : "border-espresso/30 group-hover:border-rust"
                }`}
              >
                {filters.conditions.includes(condition) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-ivory rounded-sm" />
                  </motion.div>
                )}
              </div>
              <span className="text-espresso group-hover:text-rust transition-colors">{condition}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Special Filters */}
      <FilterSection isW title="Special" isExpanded={expandedSections.special} onToggle={() => toggleSection("special")}>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) => setFilters({ ...filters, onSale: e.target.checked })}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border-2 rounded-sm mr-3 transition-colors ${
                filters.onSale ? "bg-rust border-rust" : "border-espresso/30 group-hover:border-rust"
              }`}
            >
              {filters.onSale && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-ivory rounded-sm" />
                </motion.div>
              )}
            </div>
            <span className="text-espresso group-hover:text-rust transition-colors">On Sale</span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.newArrivals}
              onChange={(e) => setFilters({ ...filters, newArrivals: e.target.checked })}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border-2 rounded-sm mr-3 transition-colors ${
                filters.newArrivals ? "bg-rust border-rust" : "border-espresso/30 group-hover:border-rust"
              }`}
            >
              {filters.newArrivals && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-ivory rounded-sm" />
                </motion.div>
              )}
            </div>
            <span className="text-espresso group-hover:text-rust transition-colors">New Arrivals</span>
          </label>
        </div>
      </FilterSection>
    </motion.div>
  )
}
