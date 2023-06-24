import {
  getProducts,
  getProductById,
  getMockingProducts,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
  getPaginateProducts,
} from "../services/product.service.js";
import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateProductErrorParam } from "../services/productErrorParams.js";
import { options } from "../config/options.js";

export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.json({ status: "error Controller", message: error.message });
  }
};

export const getMockingProductsController = async (req, res) => {
  try {
    const products = await getMockingProducts();
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
    const product = req.body;
    product.owner = req.user._id;
    const productCreated = createProduct(product);
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

export const updateProductStockController = (req, res) => {
  const productId = req.params.pid;
  if (!productId) {
    CustomError.createError({
      name: "Update Product error",
      cause: generateProductErrorParam(productId),
      message: "Error updating product",
      errorCode: EError.INVALID_PARAM,
    });
  }
  const productStock = req.params.stock;
  if (!productStock) {
    CustomError.createError({
      name: "Update Stock error",
      cause: generateProductErrorParam(productStock),
      message: "Error updating stock",
      errorCode: EError.INVALID_PARAM,
    });
  }
  const result = updateProductStock(productId, productStock);
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
