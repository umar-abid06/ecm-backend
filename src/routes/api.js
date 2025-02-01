const express = require("express");
const registerRouter = require("./auth/register/register-router");
const loginRouter = require("./auth/login/login-router");
const productRouter = require("./product/product-router");
const orderRouter = require("./order/order-router");
const shopRouter = require("./shop/shop-router");

const api = express.Router();

api.use("/auth/register", registerRouter);
api.use("/auth/login", loginRouter);
api.use("/product", productRouter);
api.use("/order", orderRouter);
api.use("/shop", shopRouter);

module.exports = api;
