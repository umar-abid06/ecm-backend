const { processPayment, getStripeApiKey } = require("./payment-controller");

const express = require("express");
const paymentRouter = express.Router();

paymentRouter.post("/process", processPayment); // POST /payment/process Process payment
paymentRouter.get("/stripe-api", getStripeApiKey); // GET /payment/stripe-api Stripe API key

module.exports = paymentRouter;
