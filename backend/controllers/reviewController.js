const Review = require('../models/Review');
const Product = require('../models/Product');

// Create Review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      rating,
      comment,
    });

    // Update product ratings
    const product = await Product.findById(productId);
    product.reviews.push(review._id);
    product.numOfReviews = product.reviews.length;
    product.ratings = 
      product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product Reviews
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate('user');
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};