const express = require("express");
const registerRouter = require("./auth/register/register-router");
const loginRouter = require("./auth/login/login-router");

const api = express.Router();

api.use("/auth/register", registerRouter);
api.use("/auth/login", loginRouter);

module.exports = api;
