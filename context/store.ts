import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import collectionSlice from './collectionsSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      collections: collectionSlice
    },
  });
};