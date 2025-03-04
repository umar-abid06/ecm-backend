const express = require("express");
const {
  httpCreateCouponCode,
  httpGetCouponsByShop,
  httpDeleteCouponCode,
  httpGetCouponValueByName,
} = require("./coupon-controller");

const couponRouter = express.Router();

couponRouter.post("/create-coupon", httpCreateCouponCode); // POST /coupon/create-coupon  - create a new coupon code
couponRouter.get("/get-coupons/:shopId", httpGetCouponsByShop); // GET /coupon/get-coupons/:shopId - get all coupons by shop ID
couponRouter.delete("/delete-coupon/:couponId", httpDeleteCouponCode); // DELETE /coupon/delete-coupon/:couponId - delete a coupon code
couponRouter.get("/get-coupon-value/:couponName", httpGetCouponValueByName); // GET /coupon/get-coupon-value/:couponName - get coupon value by name
module.exports = couponRouter;
