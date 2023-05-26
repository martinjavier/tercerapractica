import { UserManager } from "../dao/factory.js";

export const createUser = (user) => {
  try {
    let userAdded = UserManager.addUser(user);
    return userAdded;
  } catch (error) {
    return error.message;
  }
};

export const getUsers = () => {
  try {
    const users = UserManager.getUsers();
    return users;
  } catch (error) {
    return error.message;
  }
};

export const getUserById = (userId) => {
  try {
    const user = UserManager.getUserById(userId);
    return user;
  } catch (error) {
    return error.message;
  }
};

export const updateUser = (userId, user) => {
  try {
    const updatedUser = UserManager.updateUser(userId, user);
    return updatedUser;
  } catch (error) {
    return error.message;
  }
};

export const deleteUser = (userId) => {
  try {
    const deletedUser = UserManager.deleteUser(userId);
    return deletedUser;
  } catch (error) {
    return error.message;
  }
};
