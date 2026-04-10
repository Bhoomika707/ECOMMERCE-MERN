const express = require('express');
const router = express.Router();
const {
  createReview,
  getProductReviews,
  deleteReview,
} = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, createReview);
router.get('/:id', getProductReviews);
router.delete('/:id', authenticate, deleteReview);

module.exports = router;