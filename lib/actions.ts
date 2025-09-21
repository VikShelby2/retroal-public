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
          const productData = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }))
          dispatch(setProducts(productData))
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