import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity: 1,
      price: product.price,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={product.images?.[0]?.url || '/placeholder.jpg'} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-lg hover:text-blue-600">{product.name || 'Product'}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">
          {product.description?.substring(0, 50) || 'No description'}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">${product.price || 0}</span>
          <span className="text-sm text-yellow-500">⭐ {product.ratings || 0}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;