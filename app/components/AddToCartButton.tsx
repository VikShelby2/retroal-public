"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "../contexts/CartContext"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  size?: string[]
}

interface AddToCartButtonProps {
  product: Product
  selectedSize?: string
  quantity?: number
  className?: string
  showQuantity?: boolean
  variant?: "primary" | "secondary" | "icon"
}

export default function AddToCartButton({
  product,
  selectedSize,
  quantity = 1,
  className = "",
  showQuantity = false,
  variant = "primary",
}: AddToCartButtonProps) {
  const { addToCart, openCart, getItemQuantity } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const currentQuantity = getItemQuantity(product.id, selectedSize)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
   
    // Check if size is required but not selected
     if (product.size?.length > 0 && !selectedSize) {
    alert("Please select a size")
    return
  }

    console.log(product)
    setIsAdding(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
      selectedSize,
      quantity,
    })

    setIsAdding(false)
    setShowSuccess(true)

    // Show success state for 1.5 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 1500)

    // Auto-open cart after adding item
    setTimeout(() => {
      openCart()
    }, 500)
  }

  if (variant === "icon") {
    return (
      <motion.button
        className={`p-2 bg-ivory/90 rounded-full hover:bg-ivory transition-colors ${className}`}
        onClick={handleAddToCart}
        disabled={isAdding || showSuccess}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Add to cart"
      >
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="text-green-600"
            >
              <Check className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: isAdding ? 360 : 0 }}
              exit={{ scale: 0 }}
              transition={{ duration: isAdding ? 0.6 : 0.2 }}
              className="text-espresso"
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  const baseClasses =
    variant === "primary" ? "bg-gold text-espresso hover:bg-opacity-90" : "bg-rust text-ivory hover:bg-opacity-90"

  return (
    <motion.button
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${baseClasses} ${className}`}
      onClick={handleAddToCart}
      disabled={isAdding || showSuccess}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
           
            className="flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>Added!</span>
          </motion.div>
        ) : (
          <motion.div
            key="add"
          
            className="flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>
              {isAdding
                ? "Adding..."
                : currentQuantity > 0
                  ? `Add Another${showQuantity ? ` (${currentQuantity} in cart)` : ""}`
                  : "Add to Cart"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
