"use client"

import { motion } from "framer-motion"
import ProductCard from "./ProductCard"

const newArrivals = [
  {
    id: 6,
    name: "Retro Sunglasses",
    price: "$85",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    isNew: true,
    rating: 4,
    reviews: 8,
  },
  {
    id: 7,
    name: "Vintage Scarf",
    price: "$45",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    isNew: true,
    rating: 5,
    reviews: 15,
  },
  {
    id: 8,
    name: "70s Flare Jeans",
    price: "$145",
    image: "/placeholder.svg?height=400&width=300",
    category: "Denim",
    isNew: true,
    rating: 4,
    reviews: 22,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Bohemian Dress",
    price: "$175",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    isNew: true,
    rating: 5,
    reviews: 19,
    sizes: ["S", "M", "L"],
  },
  {
    id: 10,
    name: "Vintage Boots",
    price: "$225",
    image: "/placeholder.svg?height=400&width=300",
    category: "Shoes",
    isNew: true,
    rating: 4,
    reviews: 11,
    sizes: ["6", "7", "8", "9", "10"],
  },
  {
    id: 11,
    name: "Statement Necklace",
    price: "$65",
    image: "/placeholder.svg?height=400&width=300",
    category: "Jewelry",
    isNew: true,
    rating: 5,
    reviews: 7,
  },
]

interface NewArrivalsProps {
  onProductClick: (product: any) => void
}

export default function NewArrivals({ onProductClick }: NewArrivalsProps) {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">New Arrivals</h2>
          <p className="text-lg text-espresso/80 max-w-2xl mx-auto">
            Fresh finds from our latest vintage hunting adventures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
