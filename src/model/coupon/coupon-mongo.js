const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your coupoun code name!"],
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
    },
    maxAmount: {
      type: Number,
    },
    shopId: {
      type: String,
      required: true,
    },
    selectedProduct: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "coupounCodes",
  }
);
const CouponCodeModel = mongoose.model("CoupounCodeSchema", coupounCodeSchema);
module.exports = CouponCodeModel;
