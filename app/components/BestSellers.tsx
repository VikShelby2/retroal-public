"use client"

import { useRef, MouseEvent, useCallback } from "react"
import ProductCard from "./ProductCard"
import { useSelector } from "react-redux"

const bestSellers = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: "$285",
    originalPrice: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    isSale: true,
    rating: 5,
    reviews: 24,
    sizes: ["S", "M", "L"],
  },
  {
    id: 2,
    name: "High-Waisted Denim",
    price: "$165",
    image: "/placeholder.svg?height=400&width=300",
    category: "Denim",
    rating: 4,
    reviews: 18,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Silk Blouse",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    rating: 5,
    reviews: 31,
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    name: "Wool Coat",
    price: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    rating: 4,
    reviews: 12,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Vintage Dress",
    price: "$195",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 5,
    reviews: 27,
    sizes: ["XS", "S", "M", "L"],
  },
]

interface BestSellersProps {
  onProductClick: (product: any) => void
}

export default function BestSellers({ onProductClick }: BestSellersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bestSellers = useSelector((state)=>state.products.items)
  // Refs for drag state
  const isDown = useRef(false)
  const hasDragged = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  
  // Refs for momentum scrolling
  const velocity = useRef(0)
  const animationFrame = useRef<number | null>(null)

  // Damping factor for momentum (e.g., 0.95 means 5% slowdown per frame)
  const DAMPING_FACTOR = 0.95

  const momentumLoop = useCallback(() => {
    if (!scrollRef.current) return;

    // Apply velocity to scroll position
    scrollRef.current.scrollLeft += velocity.current
    
    // Apply damping to slow down
    velocity.current *= DAMPING_FACTOR
    
    // Continue loop if velocity is significant
    if (Math.abs(velocity.current) > 0.5) {
      animationFrame.current = requestAnimationFrame(momentumLoop)
    }
  }, [])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    isDown.current = true
    hasDragged.current = false
    
    // Stop any existing momentum animation
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }

    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    velocity.current = 0
  }

  const handleMouseLeave = () => {
    if (!isDown.current) return
    isDown.current = false
    if (hasDragged.current) {
        animationFrame.current = requestAnimationFrame(momentumLoop)
    }
  }

  const handleMouseUp = () => {
    if (!isDown.current) return
    isDown.current = false
    if (hasDragged.current) {
      animationFrame.current = requestAnimationFrame(momentumLoop)
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return
    e.preventDefault()
    hasDragged.current = true

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current)
    
    // Update scroll position and calculate new velocity
    const newScrollLeft = scrollLeft.current - walk
    velocity.current = newScrollLeft - scrollRef.current.scrollLeft
    scrollRef.current.scrollLeft = newScrollLeft
  }

  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">Best Sellers</h2>
          <p className="text-lg text-espresso/80 max-w-2xl mx-auto">
            Our most loved pieces, chosen by customers who appreciate timeless style
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: 'none', userSelect: "none" }} // scroll-snap interferes with momentum
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                className="flex-none w-full md:w-80"
                // The onClick logic is crucial to distinguish a drag from a click
                onClick={(e) => {
                  if (hasDragged.current) {
                    e.preventDefault() // Prevent click if it was a drag
                    return;
                  }
                  onProductClick(product)
                }}
              >
                <ProductCard onClick={onProductClick} product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}