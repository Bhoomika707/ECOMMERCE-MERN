import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFail } from '../redux/slices/productSlice';
import { getAllProducts } from '../services/api';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(state => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const res = await getAllProducts();
        dispatch(fetchProductsSuccess(res.data.products));
      } catch (err) {
        dispatch(fetchProductsFail(err.message));
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 rounded-lg mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to ShopEasy 🛍️</h1>
        <p className="text-lg">Best products at best prices</p>
      </div>

      {/* PRODUCTS */}
      <h2 className="text-2xl font-bold mb-6">🔥 Featured Products</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;