"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Sparkles, Heart, Leaf } from "lucide-react"

const brandValues = ["Sustainable.", "Retro.", "Yours."]

export default function EngagementSection() {
  const [currentValue, setCurrentValue] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const value = brandValues[currentValue]
    let index = 0

    const typeInterval = setInterval(() => {
      if (index <= value.length) {
        setDisplayText(value.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setTimeout(() => {
          setCurrentValue((prev) => (prev + 1) % brandValues.length)
          setDisplayText("")
          setIsTyping(true)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentValue])

  const icons = [
    { Icon: Star, color: "text-gold", delay: 0 },
    { Icon: Sparkles, color: "text-rust", delay: 0.2 },
    { Icon: Heart, color: "text-rust", delay: 0.4 },
    { Icon: Leaf, color: "text-gold", delay: 0.6 },
  ]

  return (
    <section className="py-20 bg-warm-brown relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className=" text-4xl md:text-6xl font-bold text-ivory mb-8">
              Fashion that's{" "}
              <span className="font-display text-gold relative">
                {displayText}
                {isTyping && <span className="animate-blink border-r-2 border-gold ml-1" />}
              </span>
            </h2>
            <p className="text-xl text-ivory/90 max-w-3xl mx-auto leading-relaxed">
              Every piece in our collection tells a story of craftsmanship, sustainability, and timeless style. Join our
              community of vintage lovers who believe in fashion with purpose.
            </p>
          </motion.div>

          {/* Animated Icons */}
          <div className="flex justify-center gap-8 md:gap-12">
            {icons.map(({ Icon, color, delay }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
                className={`${color} cursor-pointer`}
              >
                <Icon className="w-12 h-12 md:w-16 md:h-16" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <motion.button
              className="bg-gold text-espresso px-8 py-4 rounded-sm font-medium text-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Your Story
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
