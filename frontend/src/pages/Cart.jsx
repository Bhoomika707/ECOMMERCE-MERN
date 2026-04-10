import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items) || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart Page</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map(item => (
          <div
            key={item.product?._id}
            className="flex gap-4 p-4 border rounded-lg mb-4"
          >
            <img
              src={item.product?.images?.[0]?.url || '/placeholder.jpg'}
              alt={item.product?.name}
              className="w-24 h-24 object-cover"
            />

            <div className="flex-1">
              <h3 className="font-bold">
                {item.product?.name || 'Product'}
              </h3>

              <p>Price: ${item.price || 0}</p>

              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  dispatch(
                    updateCart({
                      productId: item.product?._id,
                      quantity: Number(e.target.value),
                    })
                  )
                }
                className="border px-2 py-1 w-16"
              />

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.product?._id))
                }
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;