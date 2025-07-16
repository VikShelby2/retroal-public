"use client"

import { useEffect, useState } from "react"
import Header from "./components/Header"
import HeroCarousel from "./components/HeroCarousel"
import BestSellers from "./components/BestSellers"
import NewArrivals from "./components/NewArrivals"
import CuratedCollections from "./components/CuratedCollections"
import EngagementSection from "./components/EngagementSection"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"
import ProductModal from "./components/ProductModal"
import { useDispatch, useSelector } from "react-redux"
import { listStoreProducts } from "@/lib/actions"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
 const pathname = usePathname(); // ✅ Use this instead of useRouter

  useEffect(() => {
    if (pathname === "/") {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [pathname]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <main className=" overflow-none bg-white">
      <Header />
      <HeroCarousel />
     
    </main>
  )
}
