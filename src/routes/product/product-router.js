const express = require("express");
const {
  httpGetAllProducts,
  httpCreateProduct,
  httpUpdateProductById,
  httpGetProductById,
  httpDeleteProductById,
} = require("./product-controller");

const productRouter = express.Router();

productRouter.get("/", httpGetAllProducts); // GET /products/   - get all products
productRouter.post("/", httpCreateProduct); // POST /products/  - create a new product
productRouter.get("/:id", httpGetProductById); // GET /products/:id - get a product by ID
productRouter.put("/:id", httpUpdateProductById); // PUT /products/:id - update a product by ID
productRouter.delete("/:id", httpDeleteProductById); // DELETE /products/:id - delete a product by ID

module.exports = productRouter;
