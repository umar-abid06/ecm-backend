const ProductModel = require("./product-mongo");

const getAllProducts = async () => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    throw new Error("Error getting products: " + error.message);
  }
};

// Create a new product
const createProduct = async (productData) => {
  try {
    const product = new ProductModel(productData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

// Get a product by ID
const getProductById = async (productId) => {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error getting product: " + error.message);
  }
};

// Update a product by ID
const updateProductById = async (productId, updateData) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

// Delete a product by ID
const deleteProductById = async (productId) => {
  try {
    const product = await ProductModel.findByIdAndDelete(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
