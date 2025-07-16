"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from "./ProductCard"
import AnimatedContent from "./AnmateContent"

const collections = {
  "70s Jackets": [
    {
      id: 12,
      name: "Suede Fringe Jacket",
      price: "$295",
      image: "/placeholder.svg?height=400&width=300",
      category: "70s Jackets",
      rating: 5,
      reviews: 16,
      sizes: ["S", "M", "L"],
    },
    {
      id: 13,
      name: "Corduroy Blazer",
      price: "$185",
      image: "/placeholder.svg?height=400&width=300",
      category: "70s Jackets",
      rating: 4,
      reviews: 12,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 14,
      name: "Denim Sherpa Jacket",
      price: "$165",
      image: "/placeholder.svg?height=400&width=300",
      category: "70s Jackets",
      rating: 4,
      reviews: 20,
      sizes: ["S", "M", "L", "XL"],
    },
  ],
  Denim: [
    {
      id: 15,
      name: "Vintage Levi's 501",
      price: "$125",
      image: "/placeholder.svg?height=400&width=300",
      category: "Denim",
      rating: 5,
      reviews: 35,
      sizes: ["28", "30", "32", "34", "36"],
    },
    {
      id: 16,
      name: "High-Rise Flares",
      price: "$145",
      image: "/placeholder.svg?height=400&width=300",
      category: "Denim",
      rating: 4,
      reviews: 28,
      sizes: ["XS", "S", "M", "L"],
    },
    {
      id: 17,
      name: "Denim Overalls",
      price: "$95",
      image: "/placeholder.svg?height=400&width=300",
      category: "Denim",
      rating: 4,
      reviews: 14,
      sizes: ["S", "M", "L"],
    },
  ],
  Dresses: [
    {
      id: 18,
      name: "Maxi Floral Dress",
      price: "$195",
      image: "/placeholder.svg?height=400&width=300",
      category: "Dresses",
      rating: 5,
      reviews: 22,
      sizes: ["XS", "S", "M", "L"],
    },
    {
      id: 19,
      name: "Wrap Midi Dress",
      price: "$155",
      image: "/placeholder.svg?height=400&width=300",
      category: "Dresses",
      rating: 4,
      reviews: 18,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 20,
      name: "Cocktail Dress",
      price: "$225",
      image: "/placeholder.svg?height=400&width=300",
      category: "Dresses",
      rating: 5,
      reviews: 9,
      sizes: ["XS", "S", "M"],
    },
  ],
  Accessories: [
    {
      id: 21,
      name: "Vintage Handbag",
      price: "$125",
      image: "/placeholder.svg?height=400&width=300",
      category: "Accessories",
      rating: 4,
      reviews: 13,
    },
    {
      id: 22,
      name: "Statement Belt",
      price: "$65",
      image: "/placeholder.svg?height=400&width=300",
      category: "Accessories",
      rating: 5,
      reviews: 21,
      sizes: ["S", "M", "L"],
    },
    {
      id: 23,
      name: "Silk Head Scarf",
      price: "$45",
      image: "/placeholder.svg?height=400&width=300",
      category: "Accessories",
      rating: 4,
      reviews: 17,
    },
  ],
}

interface CuratedCollectionsProps {
  onProductClick: (product: any) => void
}

export default function CuratedCollections({ onProductClick }: CuratedCollectionsProps) {
  const [activeTab, setActiveTab] = useState("70s Jackets")

  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <div
          
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">Curated Collections</h2>
          <p className="text-lg text-espresso/80 max-w-2xl mx-auto">
            Explore our carefully organized vintage collections by category
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(collections).map((collection) => (
            <motion.button
              key={collection}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === collection
                  ? "bg-rust text-ivory shadow-lg"
                  : "bg-cream text-espresso hover:bg-rust/10 border border-rust/20"
              }`}
              onClick={() => setActiveTab(collection)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {collection}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
  <AnimatedContent

  distance={50}

  direction="horizontal"

  reverse={false}

  duration={0.8}

  ease="power3.out"

  initialOpacity={0.2}

  animateOpacity

  scale={1}

  threshold={0.2}
  delay={0}

>
          <div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {collections[activeTab as keyof typeof collections].map((product, index) => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} index={index} />
            ))}
          </div></AnimatedContent>
      </div>
    </section>
  )
}
