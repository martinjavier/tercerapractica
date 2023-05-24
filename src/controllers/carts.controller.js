import { uuid } from "uuidv4";

import {
  createCart,
  getCarts,
  getCartById,
  addProduct,
  deleteCart,
  cartPurchase,
} from "../services/cart.service.js";

import {
  getProductById,
  updateProductStock,
} from "../services/product.service.js";

import { createTicket } from "../services/ticket.service.js";

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
    const result = addProduct(cartId, prodId);
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
    console.log("Cuantos Productos en el carrito: " + cart.products.length);

    const totalProductsInCart = cart.products.length;

    let amount = 0;

    for (let i = 0; i < totalProductsInCart; i++) {
      const IDProd = cart.products[i]._id;
      const QuantityProd = cart.products[i].quantity;
      const PriceProd = cart.products[i].price;

      console.log("Cart Product " + i + " ID: " + IDProd);
      console.log("Cart Product " + i + " Quantity: " + QuantityProd);

      const prod = await getProductById(IDProd);

      console.log("Product " + i + " Stock: " + prod.stock);
      console.log("Product " + i + " Price: " + prod.price);

      // Verifica el Stock de dicho producto
      if (prod.stock < QuantityProd) {
        // En caso que no haya stock informa al usuario
        res.json({
          status: "error",
          message: "There are not enough quantity of product " + IDProd,
        });
      } else {
        // Si lo hay realiza la reducción de stock en base a la cantidad de ese producto en el carrito
        const finalStock = prod.stock - QuantityProd;
        const result = await updateProductStock(IDProd, finalStock);
        amount += prod.price;
      }
    }

    const datetime = new Date();

    //const codeTicket = uuid();
    const codeTicket = "3123123";

    const newTicket = {
      code: codeTicket,
      purchase_datetime: datetime,
      amount: amount,
      purchaser: "martinjavierd@gmail.com",
    };

    const ticketCreation = createTicket(newTicket);

    const result = cartPurchase(cartId);
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
