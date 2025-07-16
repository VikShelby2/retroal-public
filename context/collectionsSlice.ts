import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// NEW: Thunk to fetch all collections


export const fetchCollectionWithProducts = createAsyncThunk(
  'collections/fetchWithProducts',
  async (collectionId, { rejectWithValue }) => {
    try {
      // Calling the new backend endpoint we created
      const response = await fetch(`https://retro-server-ux4v.onrender.com/api/product/collection/client/get/${collectionId}`);
      const data = await response.json();

      if (!response.ok) {
        // Use the error message from the backend response
        return rejectWithValue(data.message);
      }
      // The payload will be { collection: {...}, products: [...] }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchCollections = createAsyncThunk(
  'collections/fetchAll',
  async (_, { rejectWithValue }) => {
    const store ={
  _id: '686d8f84ebaaf33771f8fe79'
}
    try {
      // This endpoint should return all collections. Adjust if your API is different.
      const response = await fetch(`https://retro-server-ux4v.onrender.com/api/product/collection/list` ,
    {    method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include" ,
          body: JSON.stringify({ storeId: store._id }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCollectionById = createAsyncThunk(
  'collections/fetchById',
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://retro-server-ux4v.onrender.com/api/product/collection/${collectionId}`);
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCollection = createAsyncThunk(
  'collections/edit',
  async ({ id, collectionData }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', collectionData.name);
    formData.append('description', collectionData.description);
    formData.append('products', JSON.stringify(collectionData.products));
    formData.append('publishingChannels', JSON.stringify(collectionData.publishingChannels));

    if (collectionData.imageFile) {
      formData.append('photo', collectionData.imageFile);
    }

    try {
      const response = await fetch(`https://retro-server-ux4v.onrender.com/api/product/collection/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCollection = createAsyncThunk(
  'collections/create',
  async (collectionData, thunkAPI) => {
    const formData = new FormData();
    formData.append('name', collectionData.name);
    formData.append('description', collectionData.description);
    formData.append('products', JSON.stringify(collectionData.products));
    formData.append('publishingChannels', JSON.stringify(collectionData.publishingChannels));
    formData.append('storeId', collectionData.storeId);

    if (collectionData.imageFile) {
      formData.append('photo', collectionData.imageFile);
    }

    try {
      const response = await fetch('https://retro-server-ux4v.onrender.com/api/product/collection/add', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  newLoader:true ,
  error: null,
   selectedCollectionProducts: [] ,
  selectedCollection: null, // Keep state for a single selected collection
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for fetchCollections
      .addCase(fetchCollectionWithProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedCollection = null;
        state.selectedCollectionProducts = [];
      })
      .addCase(fetchCollectionWithProducts.fulfilled, (state, action) => {
        state.newLoader = false;
        state.loading = false;
        // The payload is { collection: {...}, products: [...] }
        state.selectedCollection = action.payload.collection;
        state.selectedCollectionProducts = action.payload.products;
      })
      .addCase(fetchCollectionWithProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newLoader = false
      })
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.newLoader = false;
        state.items = action.payload; 
        state.newLoader = false; // Replace the items array with all collections
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.newLoader = false;
        state.error = action.payload;
      })
      // Reducers for createCollection
      .addCase(createCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.newLoader = false;
        state.items.push(action.payload);
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newLoader = false;
      })
      // Reducers for fetchCollectionById
      .addCase(fetchCollectionById.pending, (state) => {
        state.loading = true;
        state.selectedCollection = null;
      })
      .addCase(fetchCollectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCollection = action.payload;
        state.newLoader = false;
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newLoader = false;
      })
      // Reducers for editCollection
      .addCase(editCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCollection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default collectionsSlice.reducer;