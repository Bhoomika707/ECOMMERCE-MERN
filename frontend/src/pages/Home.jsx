import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFail } from '../redux/slices/productSlice';
import { getAllProducts } from '../services/api';

const Home = () => {
  const dispatch = useDispatch();
  const { products = [], isLoading = false } = useSelector(
  state => state.products || {}
);
  useEffect(() => {
   const fetchProducts = async () => {
     dispatch(fetchProductsStart());
     try {
       const response = await getAllProducts();
       dispatch(fetchProductsSuccess(response.data.products));
    } catch (error) {
       dispatch(fetchProductsFail(error.message));
     }
  };
   fetchProducts();
}, []);


    return <h1>Welcome to Ecommerce Store</h1>;

};

export default Home;