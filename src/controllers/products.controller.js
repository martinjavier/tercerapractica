import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getPaginateProducts,
} from "../services/product.service.js";

export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.json({ status: "error Controller", message: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.pid);
    res.json({ status: "success", payload: product });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const createProductController = async (req, res) => {
  try {
    const productCreated = createProduct(req.body);
    res.json({ status: "success", payload: productCreated });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const updateProductController = (req, res) => {
  const productId = req.params.pid;
  const body = req.body;
  const result = updateProduct(productId, body);
  res.json({ status: "success", data: result });
};

export const deleteProductController = (req, res) => {
  const productId = req.params.pid;
  const result = deleteProduct(productId);
  res.json({ status: "success", data: result });
};

export const getPaginateProductsController = (req, res) => {
  const query = req.params.query;
  const options = req.params.options;
  const result = getPaginateProducts(query, options);
  res.json({ status: "success", data: result });
};
