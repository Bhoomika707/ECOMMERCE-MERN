import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.isLoading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    fetchProductsFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    filterProducts: (state, action) => {
      const { category, search } = action.payload;
      state.filteredProducts = state.products.filter(product => {
        const categoryMatch = !category || product.category === category;
        const searchMatch = !search || product.name.toLowerCase().includes(search.toLowerCase());
        return categoryMatch && searchMatch;
      });
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFail, filterProducts } = productSlice.actions;
export default productSlice.reducer;