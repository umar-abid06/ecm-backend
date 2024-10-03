const express = require("express");
const { httpVerifyUser, httpRegisterUser } = require("./register-controller");

const registerRouter = express.Router();

registerRouter.post("/", httpRegisterUser);
registerRouter.get("/verify/:userId/:uniqueString/", httpVerifyUser);

module.exports = registerRouter;
