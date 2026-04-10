import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],   // ✅ MUST be array
  totalPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
  item => item.product?._id === action.payload.product?._id
);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(
  item => item.product?._id === action.payload.productId
);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateCart: (state, action) => {
      const item = state.items.find(item => item.product._id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;