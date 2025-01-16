const express = require("express");
const registerRouter = require("./auth/register/register-router");
const loginRouter = require("./auth/login/login-router");
const productRouter = require("./product/product-router");

const api = express.Router();

api.use("/auth/register", registerRouter);
api.use("/auth/login", loginRouter);
api.use("/product", productRouter);

module.exports = api;
