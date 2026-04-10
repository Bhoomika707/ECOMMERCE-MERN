import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import { clearCart } from '../redux/slices/cartSlice';
import { createOrderSuccess } from '../redux/slices/orderSlice';

const Checkout = () => {
  const { items } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingInfo,
        totalPrice,
      };

      const response = await createOrder(orderData);

      dispatch(createOrderSuccess(response.data.order));
      dispatch(clearCart());

      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error(error);
      alert('Error placing order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-10">
        <p>Please login to checkout</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">

        {/* SHIPPING FORM */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">
            Shipping Information
          </h1>

          <form onSubmit={handleSubmit}>
            {['street', 'city', 'state', 'zipCode', 'country'].map(field => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field}
                value={shippingInfo[field]}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-2 border rounded"
                required
              />
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {items.map(item => (
            <div
              key={item.product._id}
              className="flex justify-between mb-4 border-b pb-2"
            >
              <div>
                <p>{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p>${item.price * item.quantity}</p>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-4">
            Total: ${totalPrice}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default Checkout;