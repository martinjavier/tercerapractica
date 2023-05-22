import FileCartManager from "./file-managers/cart.manager.js";
import FileProductManager from "./file-managers/product.manager.js";
import FileMessageManager from "./file-managers/message.manager.js";
import FileUserManager from "./file-managers/user.manager.js";

import FileProductModel from "./file-models/product.model.js";
import FileCartModel from "./file-models/cart.model.js";
import FileMessageModel from "./file-models/message.model.js";
import FileUserModel from "./file-models/user.model.js";

import DbCartManager from "./db-managers/cart.manager.js";
import DbProductManager from "./db-managers/product.manager.js";
import DbMessageManager from "./db-managers/message.manager.js";
import DbUserManager from "./db-managers/user.manager.js";

import DbProductModel from "./db-models/product.model.js";
import DbCartModel from "./db-models/cart.model.js";
import DbMessageModel from "./db-models/message.model.js";
import DbUserModel from "./db-models/user.model.js";
import { options } from "../config/options.js";

const persistence = options.server.persistance;

let CartManager,
  ProductManager,
  MessageManager,
  UserManager,
  ProductModel,
  CartModel,
  MessageModel,
  UserModel;

if (persistence === "mongo") {
  CartManager = new DbCartManager(DbCartModel);
  ProductManager = new DbProductManager(DbProductModel);
  MessageManager = DbMessageManager;
  UserManager = new DbUserManager(DbUserModel);
  ProductModel = DbProductModel;
  CartModel = DbCartModel;
  MessageModel = DbMessageModel;
  UserModel = DbUserModel;
} else if (persistence === "file") {
  CartManager = FileCartManager;
  ProductManager = FileProductManager;
  MessageManager = FileMessageManager;
  UserManager = FileUserManager;
  ProductModel = FileProductModel;
  CartModel = FileCartModel;
  MessageModel = FileMessageModel;
  UserModel = FileUserModel;
} else {
  throw new Error("Unknow persistence type");
}

export {
  CartManager,
  ProductManager,
  MessageManager,
  UserManager,
  ProductModel,
  CartModel,
  MessageModel,
  UserModel,
};
