import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: true, // Start with loading true so it shows spinner on first load
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setProducts, setError } = productsSlice.actions;
export default productsSlice.reducer;