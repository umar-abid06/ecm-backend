const ErrorHandler = require("../../services/ErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
const processPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    // If amount is in dollars, convert it to cents
    const amountInCents = amount * 100;
    const myPayment = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: { company: "ecm" },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Stripe API key
const getStripeApiKey = async (req, res) => {
  try {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  processPayment,
  getStripeApiKey,
};
