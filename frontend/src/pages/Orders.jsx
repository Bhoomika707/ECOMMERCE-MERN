import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../services/api';
import { fetchOrdersSuccess, fetchOrdersStart, fetchOrdersFail } from '../redux/slices/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(state => state.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch(fetchOrdersStart());
      try {
        const response = await getMyOrders();
        dispatch(fetchOrdersSuccess(response.data.orders));
      } catch (error) {
        dispatch(fetchOrdersFail(error.message));
      }
    };
    fetchOrders();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="font-bold">{order._id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="font-bold">${order.totalPrice}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className={`font-bold ${order.orderStatus === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                    {order.orderStatus.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">Items:</h3>
                {order.items.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    {item.product?.name} x {item.quantity} = ${item.price * item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;