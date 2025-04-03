const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getCategoryByType,
} = require("../../model/category/category-model");

async function httpGetAllCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpCreateCategory(req, res) {
  const categoryData = req.body;

  try {
    const newCategory = await createCategory(categoryData);
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpGetCategoryById(req, res) {
  const categoryId = req.params.id;

  try {
    const category = await getCategoryById(categoryId);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpUpdateCategoryById(req, res) {
  const categoryId = req.params.id;
  const updateData = req.body;

  try {
    const updatedCategory = await updateCategoryById(categoryId, updateData);
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpDeleteCategoryById(req, res) {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await deleteCategoryById(categoryId);
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Get category by categoryType (new function)
async function httpGetCategoryByType(req, res) {
  const categoryType = req.params.categoryType; // Get categoryType from request params
  console.log(categoryType);
  try {
    const category = await getCategoryByType(categoryType);
    console.log(category);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  httpGetAllCategories,
  httpCreateCategory,
  httpGetCategoryById,
  httpUpdateCategoryById,
  httpDeleteCategoryById,
  httpGetCategoryByType,
};
