"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Mail,TikTok , Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { FaTiktok } from "react-icons/fa";
export default function Footer() {
  const socialIcons = [
    { Icon: Instagram, href: "https://www.instagram.com/retroshop.al/", label: "Instagram" },
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=100069654892619", label: "Facebook" },
    { Icon: FaTiktok, href: "https://www.tiktok.com/@retroshop.al?_t=ZM-8yAAENAzkve&_r=1", label: "Twitter" },
  ]



  const contactInfo = [
    { Icon: Mail, text: "retroshop.al@gmail.com" },
    { Icon: Phone, text: "+355676738955" },
    { Icon: MapPin, text: "Tirane , Albania" },
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
   
      </div>
    </footer>
  )
}
