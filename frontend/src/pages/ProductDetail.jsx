import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, getProductReviews, createReview } from '../services/api';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetails(id);
        setProduct(response.data.product);

        const reviewsResponse = await getProductReviews(id);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity,
      price: product.price,
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId: id,
        rating,
        comment,
      });
      setRating(5);
      setComment('');
      // Refresh reviews
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!product) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={product.images?.[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <span className="ml-4 text-yellow-500">⭐ {product.ratings} ({product.numOfReviews} reviews)</span>
          </div>
          <p className="mb-4">Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

          <div className="flex gap-4 mb-6">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-3 py-2 border rounded"
            />
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {user && (
          <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-gray-100 rounded">
            <div className="mb-4">
              <label className="block mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="px-4 py-2 border rounded"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-4 py-2 border rounded mb-4"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review._id} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{review.user?.name}</h3>
                  <span className="text-yellow-500">⭐ {review.rating}/5</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;