import jwt from "jsonwebtoken";
import { Router } from "express";
import { CartManager } from "../dao/factory.js";
import { ProductManager } from "../dao/factory.js";
import { MessageManager, MessageModel } from "../dao/factory.js";
import { UserManager } from "../dao/factory.js";
import passport from "passport";
import alert from "alert";
import { isUserAuthenticate } from "../middlewares/validations.js";
import { options } from "../config/options.js";

const viewsRouter = Router();
//const productManager = new ProductManager(ProductModel);

const messageManager = new MessageManager(MessageModel);

let products = [];

viewsRouter.get("/", async (req, res) => {
  res.render("login");
});

viewsRouter.get("/login", async (req, res) => {
  res.render("login");
});

viewsRouter.get("/signup", async (req, res) => {
  res.render("signup");
});

viewsRouter.get("/forgot-password", async (req, res) => {
  res.render("forgotPassword");
});

viewsRouter.get("/reset-password", (req, res) => {
  const token = req.query.token;
  res.render("resetPassword", { token });
});

viewsRouter.get(
  "/current",
  passport.authenticate("authJWT", { session: false }),
  async (req, res) => {
    //let token = req.cookies[options.server.cookieToken];
    //const userData = jwt.verify(token, options.server.secretToken);
    try {
      if (req.user) {
        const userInfo = {
          id: req.user._id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          role: req.user.role,
        };
        res.render("current", userInfo);
      } else {
        return res.send({ message: "User must be authorized" });
      }
    } catch (error) {
      alert("Must be authenticated");
      res.redirect("/login");
    }
  }
);

viewsRouter.get(
  "/profile",
  passport.authenticate("authJWT", { session: false }),
  async (req, res) => {
    try {
      if (req.user) {
        const userInfo = {
          id: req.user._id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          role: req.user.role,
        };
        res.render("profile", userInfo);
      } else {
        return res.send({ message: "User must be authorized" });
      }
    } catch (error) {
      alert("Must be authenticated");
      res.redirect("/login");
    }
  }
);

viewsRouter.get(
  "/products",
  passport.authenticate("authJWT", { session: false }),
  async (req, res) => {
    //console.log("Products req.user" + req.user);
    try {
      let { limit = 10, page = 1, category, stock, sort = "asc" } = req.query;
      const stockValue = stock == 0 ? undefined : parseInt(stock);
      if (!["asc", "desc"].includes(sort)) {
        return res.json({ status: "error", message: "Invalid Order" });
      }
      const sortValue = sort === "asc" ? 1 : -1;
      let query = {};
      if (category && stockValue) {
        query = { category: category, stock: { $gte: stockValue } };
      } else {
        if (category || stockValue) {
          if (category) {
            query = { category: category };
          } else {
            query = { stock: { $gte: stockValue } };
          }
        }
      }
      const result = await ProductManager.getPaginateProducts(query, {
        page,
        limit,
        sort: { price: sortValue },
        lean: true,
      });
      const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
      const data = {
        email: req.user.email,
        status: "success",
        payload: result.docs,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `${baseUrl.replace(
              `page=${result.page}`,
              `page=${result.prevPage}`
            )}`
          : null,
        nextLink: result.hasNextPage
          ? baseUrl.includes("page")
            ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)
            : baseUrl.concat(`?page=${result.nextPage}`)
          : null,
      };
      res.render("products", data);
    } catch (error) {
      alert("Must be authenticated");
      res.redirect("/login");
    }
  }
);

viewsRouter.get("/product/:id", async (req, res) => {
  let prodId = req.params.id;
  let product = await ProductManager.getProductById(prodId);
  //res.render("oneproduct", { product: product });
  res.render("oneproduct", product);
});

viewsRouter.get("/cart/:cid", async (req, res) => {
  try {
    let cartId = req.params.cid;
    let cart = await CartManager.getOneCart(cartId);
    res.render("onecart", cart);
  } catch (error) {
    res.send(`<div>Was an error loading this view</div>`);
  }
});

viewsRouter.get("/carts", async (req, res) => {
  let carts = await CartManager.getCarts();
  res.render("carts", { carts: carts });
});

viewsRouter.get("/chat", async (req, res) => {
  let messages = await messageManager.getMessages();
  res.render("chat", { messages: messages });
});

export default viewsRouter;
