const {
  httpCreateWithdrawRequest,
  httpGetAllWithdrawRequests,
  httpUpdateWithdrawRequest,
} = require("./withdraw-controller");

const express = require("express");
const withdrawRouter = express.Router();
withdrawRouter.post("/create-withdraw", httpCreateWithdrawRequest); //POST "/create-withdraw", create a new withdraw request
withdrawRouter.get("/get-all-withdraws", httpGetAllWithdrawRequests); //GET "/get-all-withdraws", get all withdraw requests
withdrawRouter.put("/update-withdraw/:id", httpUpdateWithdrawRequest); // PUT "/update-withdraw/:id", update a withdraw request
module.exports = withdrawRouter;
