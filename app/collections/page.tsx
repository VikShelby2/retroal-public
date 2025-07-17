"use client"
import { motion } from "framer-motion"
import Header from "../components/Header"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fetchCollections } from "@/context/collectionsSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"


export default function CollectionsPage() {
  const dispatch = useDispatch();

  // Use useSelector to get the relevant state from the Redux store
  const { items: collections, loading, error , newLoader } = useSelector((state) => state.collections);
   const [ newLoading , setNewLoading] = useState(true)
  // Use useEffect to dispatch the fetch action once when the component mounts
  useEffect(() => {
    // We don't need to pass any arguments for fetchAll
    dispatch(fetchCollections());
  }, [dispatch]); // The dependency array ensures this runs only once

  // Show a loading message while data is being fetched
useEffect(()=>{
   if(!newLoader){
    setNewLoading(false)
   }
  } , [newLoader])
  if (newLoading) {
    return <div className="flex w-full items-center justify-center h-screen">Loading collections</div>;
  }
  // Show an error message if the fetch failed
  if (error) {
    return <div className="flex items-center justify-center h-[97hv] max-w-screen">Error fetching collections: {error}
  <Link href={'/'}>
    <Button>Go Back</Button>
  </Link>
    </div>;
  }
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto md:px-[5rem] py-12 max-w-full px-5 md:max-w-[1200px] ">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 text-sm text-espresso/70 mb-12"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-rust transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-espresso font-medium">Collections</span>
        </motion.nav>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/collections/${collection._id}`}>
                <div className="group cursor-pointer mb-1">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-sm mb-2">
                    <Image
                      src={collection.photo.url || "/placeholder.svg"}
                      alt={collection.name}
                      width={400}
                      height={500}
                      className="md:w-full w-full h-[200px] md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Collection Name and Arrow */}
                  <div className="flex items-center justify-between">
                    <h3 className=" text-sm md:text-xl font-semibold text-espresso group-hover:text-rust transition-colors duration-300">
                      {collection.name}
                    </h3>
                    <motion.div
                      className="text-espresso mr-1 group-hover:text-rust transition-colors duration-300"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="md:size-5 size-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
        </div>
      </div>
    </div>
  )
}
