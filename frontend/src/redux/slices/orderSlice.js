import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isLoading = true;
    },
    fetchOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    fetchOrdersFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createOrderStart: (state) => {
      state.isLoading = true;
    },
    createOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.orders.push(action.payload);
    },
    createOrderFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
} = orderSlice.actions;
export default orderSlice.reducer;