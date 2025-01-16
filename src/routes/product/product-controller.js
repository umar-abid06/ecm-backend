const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../../model/product/product-model");

async function httpGetAllProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpCreateProduct(req, res) {
  const productData = req.body;

  try {
    const newProduct = await createProduct(productData);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpGetProductById(req, res) {
  const productId = req.params.id;

  try {
    const product = await getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpUpdateProductById(req, res) {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    const updatedProduct = await updateProductById(productId, updateData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpDeleteProductById(req, res) {
  const productId = req.params.id;

  try {
    const deletedProduct = await deleteProductById(productId);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  httpGetAllProducts,
  httpCreateProduct,
  httpGetProductById,
  httpUpdateProductById,
  httpDeleteProductById,
};
