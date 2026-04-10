const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sales Analytics
exports.getSalesAnalytics = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product');
    const analytics = orders.map(order => ({
      orderId: order._id,
      totalPrice: order.totalPrice,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
    }));

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};