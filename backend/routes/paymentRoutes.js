const express = require('express');
const router = express.Router();
const {
  processPayment,
  createPaymentIntent,
} = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

router.post('/process', authenticate, processPayment);
router.post('/intent', authenticate, createPaymentIntent);

module.exports = router;