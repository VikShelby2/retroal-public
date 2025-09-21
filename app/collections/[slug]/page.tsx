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
