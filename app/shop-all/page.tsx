"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"
import FilterSidebar from "../components/FilterSidebar"
import SortDropdown from "../components/SortDropdown"
import SearchBar from "../components/SearchBar"
import Pagination from "../components/Pagination"
import MobileFilterDrawer from "../components/MobileFilterDrawer"
import Breadcrumbs from "../components/Breadcrumbs"
import { Filter, Grid, List, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { listStoreProducts } from "@/lib/actions"

// Extended product data

export default function ShopPage() {
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
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Page Header */}
        <div
          className="mb-1"
        >
          <h1 className=" text-4xl md:text-5xl font-bold text-espresso mb-4">Shop All</h1>
          <p className="text-lg text-espresso/80">
            Discover our complete collection of carefully curated vintage pieces
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} onClearAll={clearAllFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="mb-6 space-y-4">
           

              <div className="flex flex-col w-full sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex w-full justify-between md:justify-normal items-center gap-4">
                  {/* Mobile Filter Button */}
                  <motion.div
                    className="lg:hidden flex items-center gap-3 bg-white text-black px-4 pl-0 action:underline hover:underline py-2 rounded-sm font-medium"
                    onClick={() => setIsMobileFilterOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </motion.div>

                  {/* Results Count */}
                  <span className="text-espresso/70">
                    {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "item" : "items"}
                  </span>
                </div>

              </div>

              {/* Active Filters */}
              {(filters.categories.length > 0 ||
                filters.sizes.length > 0 ||
                filters.colors.length > 0 ||
                filters.eras.length > 0 ||
                filters.conditions.length > 0 ||
                filters.onSale ||
                filters.newArrivals ||
                searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center gap-2"
                >
                  <span className="text-sm text-espresso/70">Active filters:</span>
                  {searchQuery && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gold text-espresso px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="hover:text-rust">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  )}
                  {[...filters.categories, ...filters.sizes, ...filters.colors, ...filters.eras, ...filters.conditions]
                    .concat(filters.onSale ? ["On Sale"] : [])
                    .concat(filters.newArrivals ? ["New Arrivals"] : [])
                    .map((filter, index) => (
                      <motion.span
                        key={`${filter}-${index}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-rust text-ivory px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {filter}
                        <button
                          onClick={() => {
                            // Remove specific filter logic would go here
                          }}
                          className="hover:text-gold"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  <motion.button
                    className="text-sm text-rust hover:text-espresso underline"
                    onClick={clearAllFilters}
                    whileHover={{ scale: 1.05 }}
                  >
                    Clear all
                  </motion.button>
                </motion.div>
              )}
            </div>

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

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onClearAll={clearAllFilters}
      />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />

      <Footer />
    </div>
  )
}
