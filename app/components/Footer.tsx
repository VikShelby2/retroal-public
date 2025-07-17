"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const socialIcons = [
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
  ]

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "Care Instructions", href: "#" },
    { name: "Sustainability", href: "#" },
  ]

  const customerService = [
    { name: "Contact Us", href: "#" },
    { name: "Shipping & Returns", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Track Your Order", href: "#" },
  ]

  const contactInfo = [
    { Icon: Mail, text: "hello@velvetrevival.com" },
    { Icon: Phone, text: "(555) 123-4567" },
    { Icon: MapPin, text: "Brooklyn, NY" },
  ]

  return (
    <footer className="bg-espresso text-ivory py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <h3 className=" text-2xl font-bold mb-4">Velvet Revival</h3>
            <p className="text-ivory/80 mb-6 leading-relaxed">
              Curating timeless vintage fashion for the modern wardrobe since 2018. Every piece tells a story.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  className="text-ivory/80 hover:text-gold transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={link.href} className="text-ivory/80 hover:text-gold transition-colors duration-300">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {customerService.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={link.href} className="text-ivory/80 hover:text-gold transition-colors duration-300">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              {contactInfo.map(({ Icon, text }, index) => (
                <motion.div
                  key={text}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Icon className="w-4 h-4 text-gold" />
                  <span className="text-ivory/80">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-ivory/20 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-ivory/60 text-sm mb-4 md:mb-0">© 2024 Velvet Revival. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Link href="#" className="text-ivory/60 hover:text-gold transition-colors duration-300">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
