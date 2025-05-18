const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_Url: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopSchema",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    discount_price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    total_sell: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "products",
  }
);
const ProductModel = mongoose.model("ProductSchema", ProductSchema);
module.exports = ProductModel;
