import { setLoading, setProducts, setError } from '../context/productsSlice';

// A "thunk" that handles the async API call
export const listStoreProducts = (storeId:string , setNewLoader) => async (dispatch:any) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await fetch('https://retro-server-ux4v.onrender.com/api/product/list/client', { // Make sure your backend port is correct
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ storeId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setNewLoader(false)
      throw new Error(errorData.message || 'Failed to fetch products');
    }

    const productData = await response.json();
    dispatch(setProducts(productData));
    setNewLoader(false)
    console.log(productData)
  } catch (error:any) {
    dispatch(setError(error.message));
    setNewLoader(false)
  } finally {
    dispatch(setLoading(false));
    setNewLoader(false)
  }
};


