import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export { __dirname };

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateProduct = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    thumnail: faker.commerce.department(),
    code: parseInt(faker.string.numeric(2)),
    stock: faker.image.url(),
    status: "true",
    category: "Tecnología",
  };
};

//const product = generateProduct();
//console.log(product);
