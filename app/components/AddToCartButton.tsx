"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "../contexts/CartContext"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  images: string[]
  category: string
  sizes?: string[]
  stock?: number
}

interface AddToCartButtonProps {
  product: Product
  selectedSize?: string
  quantity?: number
  className?: string
  showQuantity?: boolean
  disabled?: boolean
  variant?: "primary" | "secondary" | "icon"
}

export default function AddToCartButton({
  product,
  selectedSize,
  IconClick ,
  quantity = 1,
  className = "",
  showQuantity = false,
  variant = "primary",
  disabled: parentDisabled // Renamed for clarity to avoid conflict
}: AddToCartButtonProps) {
  const { addToCart, openCart, getItemQuantity } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // This is the single source of truth for the item's quantity in the cart.
  const currentQuantity = getItemQuantity(product.id, selectedSize)

  // Determine if the item is out of stock by comparing cart quantity to available stock.
  const isOutOfStock = product.stock !== undefined && currentQuantity >= product.stock 

  // The button is disabled if passed from the parent, during an action, or if out of stock.
  const isDisabled = parentDisabled || isAdding || showSuccess || isOutOfStock;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()

    // This check is a safeguard; the button should already be disabled.
    if (isOutOfStock) {
      return
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size")
      return
    }

    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
      selectedSize: selectedSize,
      quantity: quantity,
      stock: product.stock
    })

    setIsAdding(false)
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
    }, 1500)

    setTimeout(() => {
      openCart()
    }, 500)
  }

  const getButtonText = () => {
    // Check for out of stock first to provide the clearest message.
    if (isOutOfStock) {
      return 'Out of Stock'
    }
    if (isAdding) {
      return "Adding..."
    }
    if (currentQuantity > 0) {
      return `Add Another${showQuantity ? ` (${currentQuantity} in cart)` : ""}`
    }
    return "Add to Cart"
  }

  if (variant === "icon") {
    return (
      <motion.button
        className={`p-2 bg-ivory/90 rounded-full hover:bg-ivory transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
       onClick={IconClick}
        whileHover={!isDisabled ? { scale: 1.1 } : {}}
        whileTap={!isDisabled ? { scale: 0.9 } : {}}
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
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <Check className="w-5 h-5" />
            <span>Added!</span>
          </motion.div>
        ) : (
          <motion.div
            key="add"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{getButtonText()}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}