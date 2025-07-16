"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function Breadcrumbs() {
  const breadcrumbs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center space-x-2 text-sm text-espresso/70 mb-6"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((item, index) => (
        <div key={item.name} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-espresso font-medium">{item.name}</span>
          ) : (
            <Link href={item.href} className="hover:text-rust transition-colors flex items-center gap-1">
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </motion.nav>
  )
}
