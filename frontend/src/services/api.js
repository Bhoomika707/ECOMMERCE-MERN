import axios from 'axios';

const API_BASE_URL = 'https://ecommerce-backend-yyeh.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (data) => api.put('/users/profile', data);

// Product APIs
export const getAllProducts = (query) => api.get('/products', { params: query });
export const getProductDetails = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Order APIs
export const createOrder = (data) => api.post('/orders', data);
export const getMyOrders = () => api.get('/orders/my-orders');
export const getOrderDetails = (id) => api.get(`/orders/${id}`);
export const getAllOrders = () => api.get('/orders/all-orders');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, status);

// Payment APIs
export const createPaymentIntent = (amount) => api.post('/payments/intent', { amount });
export const processPayment = (data) => api.post('/payments/process', data);

// Review APIs
export const createReview = (data) => api.post('/reviews', data);
export const getProductReviews = (id) => api.get(`/reviews/${id}`);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Admin APIs
export const getDashboardStats = () => api.get('/admin/stats');
export const getSalesAnalytics = () => api.get('/admin/analytics');

export default api;