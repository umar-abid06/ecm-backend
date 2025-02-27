const {
  httpCreateWithdrawRequest,
  httpGetAllWithdrawRequests,
  httpUpdateWithdrawRequest,
} = require("./withdraw-controller");

const express = require("express");
const withdrawRouter = express.Router();
withdrawRouter.post("/create-withdraw", httpCreateWithdrawRequest); // create a new withdraw request POST "/create-withdraw",
withdrawRouter.get("/get-all-withdraws", httpGetAllWithdrawRequests); // get all withdraw requests GET "/get-all-withdraws",
withdrawRouter.put("/update-withdraw/:id", httpUpdateWithdrawRequest); // update a withdraw request PUT "/update-withdraw/:id",
module.exports = withdrawRouter;
