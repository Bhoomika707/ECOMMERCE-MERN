const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Process Payment
exports.processPayment = async (req, res) => {
  try {
    const { amount, token } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method: token,
      confirm: true,
    });

    res.status(200).json({
      success: true,
      paymentIntent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};