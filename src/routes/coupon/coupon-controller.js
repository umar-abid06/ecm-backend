const {
  createCouponCode,
  getCouponsByShop,
  deleteCouponCode,
  getCouponValueByName,
} = require("../../model/coupon/coupon-model");

async function httpCreateCouponCode(req, res) {
  const couponData = req.body;

  try {
    const newCoupon = await createCouponCode(couponData);
    res.json(newCoupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetCouponsByShop(req, res) {
  const shopId = req.params.shopId;

  try {
    const coupons = await getCouponsByShop(shopId);
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpDeleteCouponCode(req, res) {
  const couponId = req.params.couponId;

  try {
    const deletedCoupon = await deleteCouponCode(couponId);
    res.json(deletedCoupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function httpGetCouponValueByName(req, res) {
  const couponName = req.params.couponName;

  try {
    const coupon = await getCouponValueByName(couponName);
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  httpCreateCouponCode,
  httpGetCouponsByShop,
  httpDeleteCouponCode,
  httpGetCouponValueByName,
};
