const express = require("express");
const {
  httpGetAllProducts,
  httpCreateProduct,
  httpUpdateProductById,
  httpGetProductById,
  httpDeleteProductById,
} = require("./product-controller");

const productRouter = express.Router();

productRouter.get("/", httpGetAllProducts); // GET /product/   - get all products
productRouter.post("/", httpCreateProduct); // POST /product/  - create a new product
productRouter.get("/:id", httpGetProductById); // GET /product/:id - get a product by ID
productRouter.put("/:id", httpUpdateProductById); // PUT /product/:id - update a product by ID
productRouter.delete("/:id", httpDeleteProductById); // DELETE /product/:id - delete a product by ID

module.exports = productRouter;
