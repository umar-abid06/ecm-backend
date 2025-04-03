const express = require("express");
const registerRouter = require("./auth/register/register-router");
const loginRouter = require("./auth/login/login-router");
const productRouter = require("./product/product-router");
const orderRouter = require("./order/order-router");
const shopRouter = require("./shop/shop-router");
const couponRouter = require("./coupon/coupon-router");
const conversationRouter = require("./conversation/conversation-router");
const eventsRouter = require("./events/events-router");
const messagesRouter = require("./messages/messages-router");
const withdrawRouter = require("./withdraw/withdraw-router");
const profileRouter = require("./profile/profile-router");
const paymentRouter = require("./payment/payment-router");
const categoryRouter = require("./category/category-router");

const api = express.Router();

api.use("/auth/register", registerRouter);
api.use("/auth/login", loginRouter);
api.use("/products", productRouter);
api.use("/order", orderRouter);
api.use("/shop", shopRouter);
api.use("/coupon", couponRouter);
api.use("/conservation", conversationRouter);
api.use("/events", eventsRouter);
api.use("/messages", messagesRouter);
api.use("/withdraws", withdrawRouter);
api.use("/profile", profileRouter);
api.use("/payment", paymentRouter);
api.use("/categories", categoryRouter);

module.exports = api;
