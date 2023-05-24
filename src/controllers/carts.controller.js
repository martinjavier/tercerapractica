import {
  createCart,
  getCarts,
  getCartById,
  addProduct,
  deleteCart,
  cartPurchase,
} from "../services/cart.service.js";

import { getProductById } from "../services/product.service.js";

export const getCartsController = async (req, res) => {
  try {
    const carts = await getCarts();
    res.json({ status: "success", payload: carts });
  } catch (error) {
    res.json({ status: "error Controller", message: error.message });
  }
};

export const getCartByIdController = async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const createCartController = async (req, res) => {
  try {
    const cartCreated = createCart();
    res.json({ status: "success", payload: cartCreated });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const deleteCartController = (req, res) => {
  const cartId = req.params.cid;
  const result = deleteCart(cartId);
  res.json({ status: "success", data: result });
};

export const addProductController = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    console.log("CART ID: " + cartId);
    console.log("PROD ID: " + prodId);

    const product = req.body;
    const result = addProduct(cartId, product);
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

export const purchaseCartController = async (req, res) => {
  try {
    const cartId = req.params.cid;
    console.log("Cart ID: " + cartId);

    const cart = await getCartById(cartId);
    console.log("Cart: " + cart);

    console.log("EN CART:");
    console.log("Cuantos Productos: " + cart.products.length);

    const IDProd1 = cart.products[0]._id;
    const QuantityProd1 = cart.products[0].quantity;

    console.log("Product 1 ID: " + IDProd1);
    console.log("Product 1 Quantity: " + QuantityProd1);

    const IDProd2 = cart.products[1]._id;
    const QuantityProd2 = cart.products[1].quantity;

    console.log("Product 2 ID: " + IDProd2);
    console.log("Product 2 Quantity: " + QuantityProd2);

    //const prod1 = getProductById(IDProd1);
    //console.log("PROD: " + prod1);
    //console.log("Prod Quantity: " + prod.quantity);

    const body = req.body;
    console.log("BODY: " + JSON.stringify(body));

    const ticketCode = req.body.code;
    console.log("Code: " + ticketCode);

    const ticketDate = req.body.purchase_datetime;
    console.log("Date: " + ticketDate);

    const ticketAmount = req.body.amount;
    console.log("Amount: " + ticketAmount);

    const ticketPurchaser = req.body.purchaser;
    console.log("Purchaser: " + ticketPurchaser);

    const result = cartPurchase(cartId);
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
