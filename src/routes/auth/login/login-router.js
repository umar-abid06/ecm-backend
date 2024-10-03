const express = require("express");
const { httpLoginUser } = require("./login-controller");

const loginRouter = express.Router();

loginRouter.post("/", httpLoginUser);
// loginRouter.get("/verify/:userId/:uniqueString/", httpVerifyUser);

module.exports = loginRouter;
