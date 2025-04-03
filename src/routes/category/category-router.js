const {
  httpGetAllCategories,
  httpCreateCategory,
  httpGetCategoryById,
  httpUpdateCategoryById,
  httpDeleteCategoryById,
  httpGetCategoryByType,
} = require("./category-controller");

const express = require("express");

const categoryRouter = express.Router();

categoryRouter.get("/", httpGetAllCategories); // GET /categories/   - get all categories
categoryRouter.post("/", httpCreateCategory); // POST /categories/  - create a new category
categoryRouter.get("/:id", httpGetCategoryById); // GET /categories/:id - get a category by ID
categoryRouter.put("/:id", httpUpdateCategoryById); // PUT /categories/:id - update a category by ID
categoryRouter.delete("/:id", httpDeleteCategoryById); // DELETE /categories/:id - delete a category by ID
categoryRouter.get("/:categoryType", httpGetCategoryByType); // GET /categories/:categoryType - get a category by type

module.exports = categoryRouter;
