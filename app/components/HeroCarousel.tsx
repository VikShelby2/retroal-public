"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";

const FALLBACK_IMAGE = "/a.jpg";

export default function HeroSection() {
  const [heroUrl, setHeroUrl] = useState<string>(FALLBACK_IMAGE);

  useEffect(() => {
    (async () => {
      try {
        // Get the single hero record from "gallery"
        const snap = await getDocs(query(collection(db, "gallery"), limit(1)));
        if (!snap.empty) {
          const d: any = snap.docs[0].data();
          // support different shapes: { photo: { url } } or { imageUrl } or { url }
          const url =
            d?.photo?.url ||
            d?.imageUrl ||
            d?.url ||
            FALLBACK_IMAGE;
          setHeroUrl(url);
        }
      } catch {
        // On any error, keep the fallback image
        setHeroUrl(FALLBACK_IMAGE);
      }
    })();
  }, []);

  const heroData = {
    image: heroUrl,
    title: "Timeless Vintage",
    subtitle: "Curated pieces from decades past",
    cta: "Shop Now",
    link: "/shop-all",
  };

  return (
    <section className="relative h-[50vh] overflow-hidden">
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
          priority
        />
        <div className="absolute inset-0 bg-espresso/40" />
      </motion.div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-ivory px-4 max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href={heroData.link}>
              <motion.button
                className="bg-transparent hover:bg-white hover:text-black text-white border-[2px] border-white px-8 py-4 rounded-sm font-medium text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
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
    </section>
  );
}
