// thunks/products.ts
import { setLoading, setProducts, setError } from "../context/productsSlice"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

 const listStoreProducts = (storeId: string, setNewLoader: (b: boolean) => void) => 
  (dispatch: any) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    setNewLoader?.(true)

    try {
      const unsub = onSnapshot(
        collection(db, "products"),
        (snap) => {
          // Sort products by createdAt descending (newest first)
          const productData = snap.docs
            .map((doc) => ({ id: doc.id, ...(doc.data() as any) }))
            .sort((a, b) => {
              // If createdAt is a Firestore Timestamp, convert to millis
              const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : a.createdAt || 0;
              const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : b.createdAt || 0;
              return bTime - aTime;
            });
          dispatch(setProducts(productData)) // Don't put createdAt in Redux state
          setNewLoader?.(false)
          dispatch(setLoading(false))
        },
        (error) => {
          dispatch(setError(error?.message || "Failed to fetch products"))
          setNewLoader?.(false)
          dispatch(setLoading(false))
        }
      )
      return unsub // caller should store and call unsub() on unmount
    } catch (err: any) {
      dispatch(setError(err?.message || "Failed to fetch products"))
      setNewLoader?.(false)
      dispatch(setLoading(false))
      return () => {}
    }
  }


  export { listStoreProducts }