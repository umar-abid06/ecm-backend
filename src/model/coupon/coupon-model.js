const CouponCodeModel = require("./coupon-mongo");

// Create a new coupon code
const createCouponCode = async (couponData) => {
  try {
    const isCouponCodeExists = await CouponCodeModel.findOne({
      name: couponData.name,
    });

    if (isCouponCodeExists) {
      throw new Error("Coupon code already exists!");
    }

    const couponCode = new CouponCodeModel(couponData);
    await couponCode.save();

    return couponCode;
  } catch (error) {
    throw new Error("Error creating coupon code: " + error.message);
  }
};

// Get all coupons of a shop
const getCouponsByShop = async (shopId) => {
  try {
    const couponCodes = await CouponCodeModel.find({ shopId });
    return couponCodes;
  } catch (error) {
    throw new Error("Error fetching coupons: " + error.message);
  }
};

// Delete a coupon code
const deleteCouponCode = async (couponId) => {
  try {
    const couponCode = await CouponCodeModel.findByIdAndDelete(couponId);

    if (!couponCode) {
      throw new Error("Coupon code doesn't exist!");
    }

    return { message: "Coupon code deleted successfully!" };
  } catch (error) {
    throw new Error("Error deleting coupon code: " + error.message);
  }
};

// Get coupon code value by name
const getCouponValueByName = async (couponName) => {
  try {
    const couponCode = await CouponCodeModel.findOne({ name: couponName });
    return couponCode;
  } catch (error) {
    throw new Error("Error fetching coupon value: " + error.message);
  }
};
module.exports = {
  createCouponCode,
  getCouponsByShop,
  deleteCouponCode,
  getCouponValueByName,
};
