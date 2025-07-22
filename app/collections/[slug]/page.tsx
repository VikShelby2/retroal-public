"use client"
import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Header from "../../components/Header"
import ProductCard from "../../components/ProductCard"
import SortDropdown from "../../components/SortDropdown"
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ProductModal from "@/app/components/ProductModal"
import { useDispatch, useSelector } from "react-redux"
import { fetchCollectionWithProducts } from "@/context/collectionsSlice"
import Footer from "@/app/components/Footer"

// Extended product data with collection associations
const allProducts = [
  // 70s Jackets Collection
  {
    id: 1,
    name: "Suede Fringe Jacket",
    price: "$295",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "70s-jackets",
    era: "1970s",
    rating: 5,
    reviews: 16,
    sizes: ["S", "M", "L"],
    description: "Authentic 70s suede jacket with fringe details and vintage patina.",
  },
  {
    id: 2,
    name: "Corduroy Blazer",
    price: "$185",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "70s-jackets",
    era: "1970s",
    rating: 4,
    reviews: 12,
    sizes: ["M", "L", "XL"],
    description: "Classic 70s corduroy blazer with wide lapels and authentic styling.",
  },
  {
    id: 3,
    name: "Denim Sherpa Jacket",
    price: "$165",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "70s-jackets",
    era: "1970s",
    rating: 4,
    reviews: 20,
    sizes: ["S", "M", "L", "XL"],
    description: "Warm sherpa-lined denim jacket perfect for layering.",
  },
  {
    id: 4,
    name: "Leather Bomber Jacket",
    price: "$320",
    originalPrice: "$380",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "70s-jackets",
    era: "1970s",
    isSale: true,
    rating: 5,
    reviews: 8,
    sizes: ["S", "M", "L"],
    description: "Premium leather bomber with authentic vintage character.",
  },

  // Vintage Denim Collection
  {
    id: 5,
    name: "Vintage Levi's 501",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    collection: "vintage-denim",
    era: "1980s",
    rating: 5,
    reviews: 35,
    sizes: ["28", "30", "32", "34", "36"],
    description: "Classic Levi's 501 jeans with perfect vintage wash and fit.",
  },
  {
    id: 6,
    name: "High-Rise Flares",
    price: "$145",
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    collection: "vintage-denim",
    era: "1970s",
    rating: 4,
    reviews: 28,
    sizes: ["XS", "S", "M", "L"],
    description: "Flattering high-rise flare jeans with authentic 70s styling.",
  },
  {
    id: 7,
    name: "Denim Overalls",
    price: "$95",
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    collection: "vintage-denim",
    era: "1990s",
    rating: 4,
    reviews: 14,
    sizes: ["S", "M", "L"],
    description: "Classic denim overalls with adjustable straps and vintage charm.",
  },

  // Silk & Satin Collection
  {
    id: 8,
    name: "Silk Blouse",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    collection: "silk-satin",
    era: "1960s",
    rating: 5,
    reviews: 31,
    sizes: ["S", "M", "L"],
    description: "Delicate floral print silk blouse with timeless elegance.",
  },
  {
    id: 9,
    name: "Satin Evening Blouse",
    price: "$165",
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    collection: "silk-satin",
    era: "1980s",
    rating: 4,
    reviews: 18,
    sizes: ["XS", "S", "M", "L"],
    description: "Luxurious satin blouse perfect for evening occasions.",
  },

  // Statement Coats Collection
  {
    id: 10,
    name: "Wool Coat",
    price: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "statement-coats",
    era: "1950s",
    rating: 4,
    reviews: 12,
    sizes: ["S", "M", "L", "XL"],
    description: "Elegant camel coat with vintage buttons and timeless style.",
  },
  {
    id: 11,
    name: "Fur-Trimmed Coat",
    price: "$450",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "statement-coats",
    era: "1960s",
    rating: 5,
    reviews: 7,
    sizes: ["S", "M", "L"],
    description: "Dramatic coat with faux fur trim and sophisticated silhouette.",
  },

  // Vintage Dresses Collection
  {
    id: 12,
    name: "Maxi Floral Dress",
    price: "$195",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    collection: "vintage-dresses",
    era: "1970s",
    rating: 5,
    reviews: 22,
    sizes: ["XS", "S", "M", "L"],
    description: "Flowing maxi dress with beautiful floral print and bohemian vibe.",
  },
  {
    id: 13,
    name: "Wrap Midi Dress",
    price: "$155",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    collection: "vintage-dresses",
    era: "1980s",
    rating: 4,
    reviews: 18,
    sizes: ["S", "M", "L", "XL"],
    description: "Flattering wrap dress with midi length and timeless appeal.",
  },

  // Accessories Collection
  {
    id: 14,
    name: "Vintage Handbag",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    collection: "accessories",
    era: "1960s",
    rating: 4,
    reviews: 13,
    description: "Classic structured handbag with vintage hardware and patina.",
  },
  {
    id: 15,
    name: "Statement Belt",
    price: "$65",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    collection: "accessories",
    era: "1980s",
    rating: 5,
    reviews: 21,
    sizes: ["S", "M", "L"],
    description: "Bold statement belt perfect for cinching vintage silhouettes.",
  },
]

const collections = {
  "70s-jackets": {
    name: "70s Jackets",
    description: "Groovy outerwear from the disco era with authentic vintage charm and character",
    image: "/placeholder.svg?height=300&width=800",
    era: "1970s",
  },
  "vintage-denim": {
    name: "Vintage Denim",
    description: "Classic jeans and denim pieces with authentic wear, perfect fading, and timeless appeal",
    image: "/placeholder.svg?height=300&width=800",
    era: "1970s-1990s",
  },
  "silk-satin": {
    name: "Silk & Satin",
    description: "Luxurious fabrics from decades past in elegant silhouettes and timeless designs",
    image: "/placeholder.svg?height=300&width=800",
    era: "1960s-1980s",
  },
  "statement-coats": {
    name: "Statement Coats",
    description: "Bold outerwear that makes an impression and tells a story of sophistication",
    image: "/placeholder.svg?height=300&width=800",
    era: "1950s-1970s",
  },
  "vintage-dresses": {
    name: "Vintage Dresses",
    description: "Timeless feminine silhouettes from every era, each with its own unique charm",
    image: "/placeholder.svg?height=300&width=800",
    era: "1950s-1990s",
  },
  accessories: {
    name: "Accessories",
    description: "Perfect finishing touches for your vintage look, from bags to belts and beyond",
    image: "/placeholder.svg?height=300&width=800",
    era: "All Eras",
  },
}

export default function CollectionPage() {
  const params = useParams()
  const dispatch = useDispatch();
  const collectionId = params.slug as string
  const [sortBy, setSortBy] = useState("featured")
   const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ newLoading , setNewLoading] = useState(true)
const { selectedCollection, selectedCollectionProducts, loading, error  ,  newLoader} = useSelector((state) => state.collections);

  useEffect(() => {
    // Only dispatch if the collectionId is available
    if (collectionId) {

      dispatch(fetchCollectionWithProducts(collectionId));
    }
  }, [dispatch, collectionId]); // Re-run if the ID changes
  useEffect(()=>{
   if(!newLoader){
    setNewLoading(false)
   }
  } , [newLoader])
  if (newLoading) {
    return <div className="flex w-full items-center justify-center h-screen">Loading collection details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }



  if (!selectedCollection) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
           <div className="w-full h-[300px] flex items-center jusitfy-center"><Loader className="animate-spin" /></div>
        </div>
      </div>  
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto md:px-[5rem] py-12 max-w-full px-5 md:max-w-[1200px] ">
        {/* Back Button */}
        <Link href="/collections">
          <motion.button
            className="flex items-center gap-2 text-espresso hover:text-rust transition-colors mb-6"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </motion.button>
        </Link>


        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className=" text-2xl font-bold text-espresso">
              {selectedCollectionProducts.length} {selectedCollectionProducts.length === 1 ? "piece" : "pieces"}
            </h2>
          </div>
        </motion.div>

        {/* Products Grid */}
        {selectedCollectionProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {selectedCollectionProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard onClick={handleProductClick} product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="min-h-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className=" text-4xl font-bold text-espresso mb-4">No products Yet</h1>
          <Link href="/collections" className="text-rust hover:text-espresso underline">
            Back to Collections
          </Link>
        </div>
      </div>
        )}
      </div>
        <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
           <Footer />
    </div>
  )
}
