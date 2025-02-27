const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema(
  {
    seller: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    collection: "withdraws",
  }
);

const WithdrawsModel = mongoose.model("WithdrawSchema", withdrawSchema);
module.exports = WithdrawsModel;
