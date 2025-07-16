"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitted(true)
    setShowToast(true)
    setEmail("")

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false)
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section className="py-20 bg-ivory relative">
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-rust text-ivory px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>Successfully subscribed! Welcome to Velvet Revival.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">Join the Revival</h2>
            <p className="text-lg text-espresso/80 mb-8">
              Get 10% off your first order and be the first to know about new arrivals, exclusive sales, and vintage
              fashion tips.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-md mx-auto"
          >
            <div className="relative">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="w-full px-4 py-4 border-2 border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory text-espresso peer transition-colors"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  email
                    ? "top-0 text-xs text-rust bg-ivory px-1"
                    : "top-4 text-espresso/60 peer-focus:top-0 peer-focus:text-xs peer-focus:text-rust peer-focus:bg-ivory peer-focus:px-1"
                }`}
              >
                Enter your email address
              </motion.label>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitted}
              className={`mt-4 w-full py-4 rounded-sm font-medium text-lg transition-all duration-300 ${
                isSubmitted
                  ? "bg-rust/50 text-ivory cursor-not-allowed"
                  : "bg-gold text-espresso hover:bg-opacity-90 hover:shadow-lg"
              }`}
              whileHover={!isSubmitted ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitted ? { scale: 0.98 } : {}}
            >
              {isSubmitted ? "Subscribed!" : "Subscribe & Save 10%"}
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-espresso/60 mt-4"
          >
            No spam, unsubscribe at any time. We respect your privacy.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
