"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart } from "lucide-react"
import AddToCartButton from "./AddToCartButton"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
  description?: string
}

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
  index?: number
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, onClick, index = 0, viewMode = "grid" }: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <div
       
        className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm  transition-all duration-300 flex"
        onClick={() => onClick(product)}
      >
        <div className="relative w-48 flex-shrink-0">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={200}
            height={250}
            className="w-full h-full object-cover"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-gold text-black px-2 py-1 text-xs font-medium rounded-full">New</span>
            )}
            {product.isSale && (
              <span className="bg-rust text-ivory px-2 py-1 text-xs font-medium rounded-full">Sale</span>
            )}
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm text-rust font-medium mb-1">{product.category}</p>
            <h3 className="font-serif text-xl font-semibold text-black mb-2 group-hover:text-rust transition-colors">
              {product.name}
            </h3>
            <p className="text-black/70 mb-4 line-clamp-2">{product.description}</p>
          </div>

          <div className="flex items-center justify-between md:flex-row flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-black">{product.price} LEK</span>
              {product.originalPrice && (
                <span className="text-sm text-black/60 line-through">{product.originalPrice} lek</span>
              )}
            </div>
            <AddToCartButton product={product} variant="secondary" className="px-4 py-2 text-sm" />
          </div>
        </div>
      </div>
    )
  }

  // Grid view (existing code)
  return (
    <div
     
      className="group cursor-pointer bg-white rounded-[0rem] overflow-hidden  transition-all duration-300"
      onClick={() => onClick(product)}
    >
      {/* Rest of the existing grid view code remains the same */}
      <div className="relative overflow-hidden">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={400}
            className="w-full xl:h-80 md:w-full w-full h-[200px] object-cover rounded-b-[0rem]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-gold text-black px-2 py-1 text-xs font-medium rounded-full"
            >
              New
            </motion.span>
          )}
          {product.isSale && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-rust text-ivory px-2 py-1 text-xs font-medium rounded-full"
            >
              Sale
            </motion.span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            className="bg-ivory/90 p-2 rounded-full hover:bg-ivory transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              // Handle wishlist
            }}
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 text-black" />
          </motion.button>
          <AddToCartButton
            product={product}
            variant="icon"
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
        </div>
      </div>

      <div className="p-4 pt-2 px-0">
        <p className="text-sm text-rust font-medium ">{product.category}</p>
        <h3 className=" text-[12px] md:text-xl font-semibold text-black mb-1 group-hover:text-rust transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className=" text-sm text-black">{product.price} LEK</span>
          
        </div>
      </div>
    </div>
  )
}
