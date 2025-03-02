const ErrorHandler = require("../../services/ErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
const processPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const myPayment = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { company: "ecm" },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get Stripe API key
const getStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  processPayment,
  getStripeApiKey,
};
