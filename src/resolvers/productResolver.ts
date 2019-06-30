import { PubSub } from "graphql-subscriptions";
import TransactionModel from "../models/transactionModel";
import Product, { ProductType } from "../schemas/productSchema";
import { TransactionType } from "../schemas/transactionSchema";
import logger from "../utils/logger";

const transactionModel: TransactionModel = new TransactionModel();
const PRODUCT_ADDED = "PRODUCT_ADDED";
const pubSub = new PubSub();

export default {
  Subscription: {
    products: {
      subscribe: () => pubSub.asyncIterator(PRODUCT_ADDED),
    },
  },
  Query: {
    products: async () => {
      try {
        const products: [ProductType] = await Product.find();
        return products;
      } catch (error) {
        logger.error(error.message);
        throw error.message;
      }
    },
    product: async ({}, { id }, {}) => {
      try {
        const product: ProductType = await Product.findById(id);
        return product;
      } catch (error) {
        logger.error(error.message);
        throw error.message;
      }
    },
  },
  Product: {
    id: (product) => product.id,
    name: (product) => product.name,
    price: (product) => product.price,
    createdAt: (product) => product.createdAt,
    transactions: async (product) => {
      try {
        // n+1 problem is not resolve
        // TODO : need to resolve n+1 problem with dataLoader
        const transactions: [TransactionType] = await transactionModel.getTransactions([product.id]);
        return transactions;
      } catch (error) {
        logger.error(error.message);
        throw error.message;
      }
    },
  },
  Mutation: {
    addProduct: async ({}, args, {}) => {
      const newProduct = new Product(args);
      try {
        const product: ProductType = await newProduct.save();
        pubSub.publish(PRODUCT_ADDED, { products: product });
        return product;
      } catch (error) {
        logger.error(error.message);
        throw error.message;
      }
    },
  },
};
