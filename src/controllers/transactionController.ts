import { Request, Response } from "express";
import TransactionModel from "../models/transactionModel";
import logger from "../utils/logger";

const transactionModel: TransactionModel = new TransactionModel();

/**
 * Add new transaction
 *
 * @method post
 * @param request {Request} The express request object.
 * @param response {Response} The express response object.
 *
 *
 * @api {post} /transactions/ Add new transaction
 * @apiVersion 1.0.0
 * @apiName addTransaction
 * @apiGroup Transaction
 *
 * @apiParam {String} product product id
 * @apiParam {Number} quantity product quantity
 *
 * @apiSuccess {String} _id unique id of the transaction.
 * @apiSuccess {String} product product id
 * @apiSuccess {Number} quantity  Product quantity
 * @apiSuccess {String} createdAt  createdAt time of product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "time": 1561736870906,
 *      "_id": "5d16371c0e81a82315f86413",
 *      "product": "5d1637090e81a82315f86410",
 *      "quantity": 6,
 *     }
 */

export const createTransaction = async (request: Request, response: Response) => {
  const params = request.body;
  try {
    const product = await transactionModel.createTransaction(params);
    response.status(201).json(product);
  } catch (error) {
    logger.error(error.toString());
    const message = {
      message: error.toString(),
    };
    response.status(400).json(message);
  }
};
