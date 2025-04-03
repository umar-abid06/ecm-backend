const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      default: "",
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    categoryType: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categories",
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("CategorySchema", categorySchema);
module.exports = CategoryModel;
