const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getSalesAnalytics,
} = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/stats', authenticate, authorize('admin'), getDashboardStats);
router.get('/analytics', authenticate, authorize('admin'), getSalesAnalytics);

module.exports = router;