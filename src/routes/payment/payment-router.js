const { processPayment, getStripeApiKey } = require("./payment-controller");

const express = require("express");
const paymentRouter = express.Router();

paymentRouter.post("/payment/process", processPayment); // Process payment
paymentRouter.get("/stripe-api", getStripeApiKey); // Get Stripe API key

module.exports = paymentRouter;
