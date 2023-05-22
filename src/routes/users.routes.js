import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getUsersController);
usersRouter.get("/:uid", getUserByIdController);
usersRouter.post("/", createUserController);
usersRouter.put("/:uid", updateUserController);
usersRouter.delete("/:uid", deleteUserController);

export default usersRouter;
