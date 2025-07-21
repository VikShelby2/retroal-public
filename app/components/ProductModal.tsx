"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import AddToCartButton from "./AddToCartButton"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  images: string[]
  category: string
  description?: string
  sizes?: string[]
  rating?: number
  reviews?: number
  stock?: number
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isOutOfStock, setIsOutOfStock] = useState(false)

  useEffect(() => {
    console.log(isOutOfStock  )
    if (product && typeof product.stock !== 'undefined') {
      if (product.stock === 0 || quantity > product.stock) {
        setIsOutOfStock(true)
      } else {
        setIsOutOfStock(false)
      }
    } else {
      setIsOutOfStock(false)
    }
  }, [product, quantity])

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      setQuantity(1) // Reset quantity on open
    }
  }, [isOpen, product])

  if (!product) return null

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0
    const newIndex = isFirstImage ? product.images.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentImageIndex === product.images.length - 1
    const newIndex = isLastImage ? 0 : currentImageIndex + 1
    setCurrentImageIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentImageIndex(slideIndex)
  }

  const handleQuantityChange = (amount: number) => {
    console.log(product.stock)
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
        if (product.stock && newQuantity > product.stock) {
            setQuantity(product.stock); // Cap quantity at available stock
        } else {
            setQuantity(newQuantity);
        }
    }
  }
function removeDollarSign(str) {
  if (str.startsWith('$')) {
    return str.slice(1);
  }
  return str;
}
function getRandomNumber() {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
}

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white backdrop-blur-sm z-50 flex items-start md:items-center md:justify-center md:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            {/* Close Button */}
            <motion.button
              className="absolute md:top-4 right-4 z-10 bg-white p-2 rounded-full hover:bg-ivory transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-espresso" />
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                {/* Main Image */}
                <div className="w-full h-96 md:h-full overflow-hidden rounded-lg">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={product.images[currentImageIndex] || "/placeholder.svg"}
                        alt={`${product.name} - image ${currentImageIndex + 1}`}
                        width={500}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left Arrow */}
                <div
                  onClick={goToPrevious}
                  className="absolute top-1/2 -translate-y-1/2 left-3 bg-ivory/70 p-2 rounded-full cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5 text-espresso" />
                </div>

                {/* Right Arrow */}
                <div
                  onClick={goToNext}
                  className="absolute top-1/2 -translate-y-1/2 right-3 bg-ivory/70 p-2 rounded-full cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5 text-espresso" />
                </div>

                {/* Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                        currentImageIndex === slideIndex ? 'bg-ivory' : 'bg-ivory/50'
                      }`}
                    ></div>
                  ))}
                </div>
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col"
              >
                <div className="mb-4">
                  <p className="text-rust font-medium mb-2">{product.category}</p>
                  <h2 id="product-modal-title" className=" text-3xl font-bold text-espresso mb-4">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < product.rating! ? "text-gold fill-current" : "text-espresso/30"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-espresso/70">({getRandomNumber()} reviews)</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-bold text-2xl text-espresso">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-espresso/60 line-through">LEK {removeDollarSign(product.originalPrice)}</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-espresso/80 mb-6 leading-relaxed">
                    {product.description ||
                      "This carefully curated vintage piece combines timeless style with authentic character. Each item tells its own story and brings unique charm to your wardrobe."}
                  </p>
                </div>

                {/* Size Selection */}
                {product.sizes && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-espresso mb-3">Size</h3>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <motion.button
                          key={size}
                          className={`px-4 py-2 border rounded-sm transition-colors ${
                            selectedSize === size
                              ? "border-rust bg-rust text-ivory"
                              : "border-espresso/30 text-espresso hover:border-rust"
                          }`}
                          onClick={() => setSelectedSize(size)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-semibold text-espresso mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="w-10 h-10 border border-espresso/30 rounded-sm flex items-center justify-center hover:border-rust transition-colors"
                      onClick={() => handleQuantityChange(-1)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      -
                    </motion.button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <motion.button
                      className="w-10 h-10 border border-espresso/30 rounded-sm flex items-center justify-center hover:border-rust transition-colors"
                      onClick={() => handleQuantityChange(1)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-auto">
                  <AddToCartButton
                    product={product}
                    selectedSize={selectedSize}
                    quantity={quantity}
                    className="flex-1"
                    disabled={isOutOfStock}
                  />
                  <motion.button
                    className="bg-rust text-ivory py-3 px-4 rounded-sm hover:bg-opacity-90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}