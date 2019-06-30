import { Request, Response } from "express";
import ProductModel from "../models/productModel";
import logger from "../utils/logger";

const productModel: ProductModel = new ProductModel();

/**
 * Add new product
 *
 * @method post
 * @param request {Request} The express request object.
 * @param response {Response} The express response object.
 *
 *
 * @api {post} /products/ Add new product
 * @apiVersion 1.0.0
 * @apiName addProduct
 * @apiGroup Product
 *
 * @apiParam {String} name product name
 * @apiParam {Number} price product price
 *
 * @apiSuccess {String} _id unique id of the product.
 * @apiSuccess {String} name product name.
 * @apiSuccess {Number} price  Product price.
 * @apiSuccess {String} createdAt  createdAt time of product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "_id": "5d1637090e81a82315f86410",
 *      "name": "Product 433",
 *      "price": 50,
 *      "createdAt": "2019-06-28T15:49:29.892Z",
 *      "__v": 0,
 *    }
 */
export const createProduct = async (request: Request, response: Response) => {
  const params = request.body;
  try {
    const product = await productModel.createProduct(params);
    response.status(201).json(product);
  } catch (error) {
    logger.error(error.toString());
    const message = {
      message: error.toString(),
    };
    response.status(400).json(message);
  }
};

/**
 * Get All products
 *
 * @method get
 * @param request {Request} The express request object.
 * @param response {Response} The express response object.
 *
 *
 * @api {get} /products/ Get products
 * @apiVersion 1.0.0
 * @apiName getProducts
 * @apiGroup Product
 *
 * @apiSuccessExample Success-Response:
 * [
 * {
 *   "id": "5d15efeff7608c1871256e81",
 *   "transactions": [
 *     {
 *       "id": "5d15eff5f7608c1871256e82",
 *       "time": 1561718762433,
 *       "quantity": 10
 *     },
 *     {
 *       "id": "5d15f016f7608c1871256e83",
 *       "time": 1561718762433,
 *       "quantity": 5
 *     },
 *     {
 *       "id": "5d15f01af7608c1871256e84",
 *       "time": 1561718762433,
 *       "quantity": 7
 *     }
 *   ]
 * },
 * ]
 */
export const getProducts = async ({}, response: Response) => {
  try {
    const products = await productModel.getProducts();
    response.status(200).json(products);
  } catch (error) {
    logger.error(error.toString());
    const message = {
      message: error.toString(),
    };
    response.status(400).json(message);
  }
};
/**
 * Get A product
 *
 * @method get
 * @param request {Request} The express request object.
 * @param response {Response} The express response object.
 *
 *
 * @api {get} /products/:productId Get A product
 * @apiVersion 1.0.0
 * @apiName getProduct
 * @apiGroup Product
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "id": "5d15efeff7608c1871256e81",
 *   "transactions": [
 *     {
 *       "id": "5d15eff5f7608c1871256e82",
 *       "time": 1561718762433,
 *       "quantity": 10
 *     },
 *     {
 *       "id": "5d15f016f7608c1871256e83",
 *       "time": 1561718762433,
 *       "quantity": 5
 *     },
 *     {
 *       "id": "5d15f01af7608c1871256e84",
 *       "time": 1561718762433,
 *       "quantity": 7
 *     }
 *   ]
 * }
 */
export const getProduct = async (request: Request, response: Response) => {
  try {
    const { productId } = request.params;
    const product = await productModel.getProduct(productId);
    response.status(200).json(product);
  } catch (error) {
    logger.error(error.toString());
    const message = {
      message: error.toString(),
    };
    response.status(400).json(message);
  }
};
