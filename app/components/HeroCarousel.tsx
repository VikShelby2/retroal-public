"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// We no longer need an array, just the data for our single, static hero section.
const heroData = {
  image: "https://fluxhawaii.com/wp-content/uploads/2024/03/FLUX-SS23_Old-Queen-Street-Stadium-Hero.jpg",
  title: "Timeless Vintage",
  subtitle: "Curated pieces from decades past",
  cta: "Shop Now",
  link: '/shop-all '
}

export default function HeroSection() {
  // All state (useState) and side effects (useEffect) for the carousel have been removed.

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image: No longer needs AnimatePresence or a key */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={heroData.image}
          alt={heroData.title}
          fill
          className="object-cover max-h-screen"
          priority // Keep priority for fast LCP (Largest Contentful Paint)
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-espresso/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-ivory px-4 max-w-4xl">
          {/* 
            The content animations still work on page load, 
            but no longer re-trigger since AnimatePresence and the 'key' are gone.
          */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
            <Link href={heroData.link}>
             <motion.button
              className="bg-transparent hover:bg-white hover:text-black transition-colors text-white border-[2px] border-white px-8 py-4 rounded-sm font-medium text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {heroData.cta}
            </motion.button>
            </Link>
           
          </motion.div>
        </div>
      </div>
      
      {/* Navigation and Indicators are completely removed */}
    </section>
  )
}