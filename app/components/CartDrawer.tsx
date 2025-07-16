"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "../contexts/CartContext"

export default function CartDrawer() {
  const { state, closeCart, updateQuantity, removeFromCart, clearCart } = useCart()

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }
function removeDollarSign(price: string | number): string {
  return String(price).replace(/^\$/, '');
}

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-espresso/50 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-ivory z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-espresso/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-espresso" />
                <h2 className="font-serif text-xl font-bold text-espresso">Shopping Cart ({state.totalItems})</h2>
              </div>
              <motion.button
                className="p-2 hover:bg-cream rounded-sm transition-colors"
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-espresso" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center p-6"
                >
                  <ShoppingBag className="w-16 h-16 text-espresso/30 mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-espresso mb-2">Your cart is empty</h3>
                  <p className="text-espresso/70 mb-6">Discover our vintage collection and add some timeless pieces</p>
                  <motion.button
                    className="bg-gold text-espresso px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-colors"
                    onClick={closeCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              ) : (
                <div className="p-4 space-y-4">
                  <AnimatePresence>
                    {state.items.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${item.selectedSize}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex gap-4 p-4 bg-cream rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-sm"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="w-full flex items-center justify-between"><h4 className="font-semibold text-espresso truncate">{item.name}</h4>
  <motion.button
                          className="p-2 text-espresso/50 hover:text-rust transition-colors"
                          onClick={() => removeFromCart(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                          </div>
                          
                          <p className="text-sm text-espresso/70">{item.category}</p>
                          {item.selectedSize && <p className="text-sm text-espresso/70">Size: {item.selectedSize}</p>}

                          <div className="flex items-center justify-between mt-2">
                            {/* Price */}
                            <div className="flex items-start w-full mr-2 gap-2">
                              <span className="font-semibold text-espresso"> {item.price}</span>
                              <span>ALL</span>
                            
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <motion.button
                                className="w-8 h-8 flex items-center justify-center bg-ivory border border-espresso/20 rounded-sm hover:border-rust transition-colors"
                                onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <motion.button
                                className="w-8 h-8 flex items-center justify-center bg-ivory border border-espresso/20 rounded-sm hover:border-rust transition-colors"
                                onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                      
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Clear Cart Button */}
                  {state.items.length > 0 && (
                    <motion.button
                      className="w-full text-center text-sm text-rust hover:text-espresso underline py-2"
                      onClick={clearCart}
                      whileHover={{ scale: 1.02 }}
                    >
                      Clear all items
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-espresso/10 p-6 space-y-4"
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-espresso">Subtotal:</span>
                  <span className="text-espresso">LEK {state.totalPrice.toFixed(2)}</span>
                </div>

                {/* Shipping Note */}
                <p className="text-sm text-espresso/70 text-center">Shipping and taxes calculated at checkout</p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href="/checkout">
                    <motion.button
                      className="w-full bg-gold text-espresso py-4 rounded-sm font-medium text-lg hover:bg-opacity-90 transition-colors"
                      onClick={closeCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Checkout
                    </motion.button>
                  </Link>
                  <motion.button
                    className="w-full bg-rust text-ivory py-3 rounded-sm font-medium hover:bg-opacity-90 transition-colors"
                    onClick={closeCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
