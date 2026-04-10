import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">

      <img
        src={product.images?.[0]?.url || '/placeholder.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <div className="mt-3">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-lg hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm">
          {product.description?.substring(0, 40)}...
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 font-bold text-lg">
            ${product.price}
          </span>
          <span>⭐ {product.ratings || 0}</span>
        </div>

        <button
          onClick={() =>
            dispatch(addToCart({
              product,
              quantity: 1,
              price: product.price,
            }))
          }
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;