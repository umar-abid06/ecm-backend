const express = require("express");
const {
  httpCreateCouponCode,
  httpGetCouponsByShop,
  httpDeleteCouponCode,
  httpGetCouponValueByName,
} = require("./coupon-controller");

const couponRouter = express.Router();

couponRouter.post("/create-coupon", httpCreateCouponCode); // POST /coupon/create-coupon  - create a new coupon code    // create a new coupon code POST "/create-coupon",  // create a new coupon code POST "/create-coupon",
couponRouter.get("/get-coupons/:shopId", httpGetCouponsByShop); // GET /coupon/get-coupons/:shopId - get all coupons by shop ID    // get all coupons by shop ID GET "/get-coupons/:shopId",  // get all coupons by shop ID GET "/get-coupons/:shopId",
couponRouter.delete("/delete-coupon/:couponId", httpDeleteCouponCode); // DELETE /coupon/delete-coupon/:couponId - delete a coupon code    // delete a coupon code DELETE "/delete-coupon/:couponId",  // delete a coupon code DELETE "/delete-coupon/:couponId",
couponRouter.get("/get-coupon-value/:couponName", httpGetCouponValueByName); // GET /coupon/get-coupon-value/:couponName - get coupon value by name    // get coupon value by name GET "/get-coupon-value/:couponName",  // get coupon value by name GET "/get-coupon-value/:couponName",

module.exports = couponRouter;
