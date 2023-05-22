import { UserManager } from "../dao/factory.js";
import alert from "alert";
import jwt from "jsonwebtoken";
import { options } from "../config/options.js";
import { isValidPassword, createHash } from "../utils.js";

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const user = await UserManager.getUserByEmail(email);
    if (!user) {
      let role = "user";
      if (email.endsWith("@coder.com")) {
        role = "admin";
      }
      const newUser = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role,
      };
      const userCreated = await UserManager.addUser(newUser);
      const token = jwt.sign(
        {
          _id: userCreated._id,
          first_name: userCreated.first_name,
          email: userCreated.email,
          role: userCreated.role,
        },
        options.server.secretToken,
        { expiresIn: "24h" }
      );
      res
        .cookie(options.server.cookieToken, token, {
          httpOnly: true,
        })
        .redirect("/productos");
    } else {
      alert("User was already registered");
      res.redirect("/login");
    }
  } catch (error) {
    res.json({ stats: "error", message: error.message });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await UserManager.getUserByEmail(email);
    if (user) {
      if (isValidPassword(user, password)) {
        const token = jwt.sign(
          {
            _id: user._id,
            first_name: user.first_name,
            email: user.email,
            role: user.role,
          },
          options.server.secretToken,
          { expiresIn: "24h" }
        );
        res
          .cookie(options.server.cookieToken, token, {
            httpOnly: true,
          })
          .redirect("/products");
      } else {
        alert("Wrong Credentials");
        res.redirect("/login");
      }
    } else {
      alert("User was not registered");
      res.redirect("/signup");
    }
  } catch (error) {
    res.json({ stats: "errorLogin", message: error.message });
  }
};
