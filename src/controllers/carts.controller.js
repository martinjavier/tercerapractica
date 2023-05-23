import {
  createCart,
  getCarts,
  getCartById,
  addProduct,
  deleteCart,
  cartPurchase,
} from "../services/cart.service.js";

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
    const cartCreated = createCart(req.body);
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
    console.log("Purchase Cart ID: " + cartId);
    const product = req.body;
    console.log(
      "Purchase Product Quantity: " + JSON.stringify(product.quantity)
    );
    const result = cartPurchase(cartId);
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
