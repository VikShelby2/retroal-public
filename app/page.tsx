"use client"

import { useEffect, useMemo, useState } from "react"
import Header from "./components/Header"

import { motion, AnimatePresence } from "framer-motion"
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
import ProductCard from "./components/ProductCard"
import Pagination from "./components/Pagination"

export default function Home() {
  
const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [ newLoading , setNewLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
 const dispatch = useDispatch();

  // Use useSelector to get the relevant state from the Redux store
  const { items: allProducts, loading, error } = useSelector((state) => state.products);

  // In a real app, you'd get the store ID from the user's session, URL params, etc.
  const MOCK_STORE_ID = '686d8f84ebaaf33771f8fe79'; // Replace with a real ID from your DB

  // useEffect will run once when the component mounts to fetch the data
  useEffect(() => {
    // We dispatch our thunk action here
    dispatch(listStoreProducts(MOCK_STORE_ID , setNewLoading));
    
  }, [dispatch]); 
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 10000],
    sizes: [] as string[],
    colors: [] as string[],
    eras: [] as string[],
    conditions: [] as string[],
    onSale: false,
    newArrivals: false,
  })

  const itemsPerPage = 12

  // Filter and sort products
 const filteredAndSortedProducts = useMemo(() => {
    // Start with all products received from the API
   console.log("--- STARTING FILTERING ---", { 
        filters, 
        totalProducts: allProducts.length 
    });

    const filtered = allProducts.filter((product) => {
        console.log(`\n--- Checking Product: ${product.name} ---`);

        // --- 1. Search Query ---
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            console.log(`[FAIL] Search: "${searchQuery}" not in "${product.name}"`);
            return false;
        }

        // --- 2. Category Filter ---
        if (filters.categories.length > 0) {
            const categoryMatch = filters.categories.includes(product.category);
            console.log(`[INFO] Category: User wants [${filters.categories.join(', ')}], product has "${product.category}". Match: ${categoryMatch}`);
            if (!categoryMatch) {
                console.log(`[FAIL] Category`);
                return false;
            }
        }

        // --- 3. Price Range Filter ---
        // Using parseFloat is safer than parseInt for prices with decimals
        const price = parseFloat(product.price.replace("$", ""));
        console.log(`[INFO] Price: Product price is ${price}. User range is [${filters.priceRange[0]} - ${filters.priceRange[1]}].`);
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
            console.log(`[FAIL] Price: ${price} is outside the range.`);
            return false;
        }

        // --- 4. Sizes Filter ---
        if (filters.sizes.length > 0) {
            // Guard against product.sizes being undefined or null
            if (!product.sizes || product.sizes.length === 0) {
                console.log(`[FAIL] Sizes: Product has no sizes defined.`);
                return false;
            }
            const sizeMatch = filters.sizes.some(size => product.sizes.includes(size));
            console.log(`[INFO] Sizes: User wants [${filters.sizes.join(', ')}], product has [${product.sizes.join(', ')}]. Match: ${sizeMatch}`);
            if (!sizeMatch) {
                console.log(`[FAIL] Sizes`);
                return false;
            }
        }

        // --- 5. Color Filter ---
        if (filters.colors.length > 0) {
            const colorMatch = filters.colors.includes(product.color);
            console.log(`[INFO] Color: User wants [${filters.colors.join(', ')}], product has "${product.color}". Match: ${colorMatch}`);
            if (!colorMatch) {
                console.log(`[FAIL] Color`);
                return false;
            }
        }

        // --- 6. Sale Filter ---
        if (filters.onSale) {
            console.log(`[INFO] Sale: User wants on-sale items. Product isSale: ${product.isSale}`);
            if (!product.isSale) {
                console.log(`[FAIL] Sale`);
                return false;
            }
        }

        // --- 7. New Arrivals Filter ---
        if (filters.newArrivals) {
            console.log(`[INFO] New: User wants new items. Product isNew: ${product.isNew}`);
            if (!product.isNew) {
                console.log(`[FAIL] New`);
                return false;
            }
        }

        console.log(`[PASS] Product "${product.name}" passed all filters.`);
        return true;
    });

    console.log("--- FINISHED FILTERING ---", { 
        productsFound: filtered.length 
    });


    // --- SORTING LOGIC (This was already correct) ---
    const sorted = [...filtered]; // Create a new array to avoid mutating the filtered one directly
    
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", "")));
        break;
      case "price-high":
        sorted.sort((a, b) => parseInt(b.price.replace("$", "")) - parseInt(a.price.replace("$", "")));
        break;
      case "newest":
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // No sort needed
        break;
    }

    return sorted;

  }, [allProducts, searchQuery, filters, sortBy]); // Added allProducts to dependency array

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 10000],
      sizes: [],
      colors: [],
      eras: [],
      conditions: [],
      onSale: false,
      newArrivals: false,
    })
    setSearchQuery("")
    setCurrentPage(1)
  }
  if (newLoading) {
    return <div className="flex w-full items-center justify-center h-screen">Loading products...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: 'red' }}>Error: {error}</div>;
  }
  
  return (
    <main className=" overflow-none bg-white">
      <Header />
      <HeroCarousel />
     <div className="container mx-auto md:px-[5rem] py-12 max-w-full px-5 md:max-w-[1200px] ">
             {/* Breadcrumbs */}
     

     
             <div className="flex flex-col lg:flex-row gap-8">
               {/* Desktop Sidebar */}
               
     
               {/* Main Content */}
               <div className="flex-1">
                 {/* Search and Controls */}
                
     
                 {/* Products Grid/List */}
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={`${viewMode}-${currentPage}`}
                     
                     transition={{ duration: 0.4 }}
                     className={
                       viewMode === "grid"
                         ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                         : "space-y-6"
                     }
                   >
                     {paginatedProducts.map((product, index) => (
                       <ProductCard
                         key={product.id}
                         product={product}
                         onClick={handleProductClick}
                         index={index}
                         viewMode={viewMode}
                       />
                     ))}
                   </motion.div>
                 </AnimatePresence>
     
                 {/* No Results */}
                 {filteredAndSortedProducts.length === 0 && (
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                     <h3 className=" text-2xl font-bold text-espresso mb-4">No items found</h3>
                     <p className="text-espresso/70 mb-6">Try adjusting your filters or search terms</p>
                     <motion.button
                       className="bg-gold text-espresso px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-colors"
                       onClick={clearAllFilters}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       Clear All Filters
                     </motion.button>
                   </motion.div>
                 )}
     
                 {/* Pagination */}
                 {totalPages > 1 && (
                   <div className="mt-12">
                     <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                   </div>
                 )}
               </div>
             </div>
           </div>
            <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
           <Newsletter />
           <Footer />
    </main>
  )
}
