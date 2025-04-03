const CategoryModel = require("./category-mongo");

// Get all categories
const getAllCategories = async () => {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    throw new Error("Error getting categories: " + error.message);
  }
};

// Create a new category
const createCategory = async (categoryData) => {
  try {
    const category = new CategoryModel(categoryData);
    await category.save();
    return category;
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

// Get a category by ID
const getCategoryById = async (categoryId) => {
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Error getting category: " + error.message);
  }
};
const getCategoryByType = async (categoryType) => {
  console.log(categoryType);
  try {
    const category = await CategoryModel.findOne(categoryType);
    console.log(category);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Error getting category by type: " + error.message);
  }
};
// Update a category by ID
const updateCategoryById = async (categoryId, updateData) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

// Delete a category by ID
const deleteCategoryById = async (categoryId) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Error deleting category: " + error.message);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getCategoryByType,
};
