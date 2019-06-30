import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts
} from "../controllers/productController";

const productRouter = Router();

productRouter.route("/products")
  .post(createProduct)
  .get(getProducts);

productRouter.route("/products/:productId")
  .get(getProduct);

export default productRouter;
