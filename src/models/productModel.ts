import Product, { ProductType } from "../schemas/productSchema";
import { TransactionType } from "../schemas/transactionSchema";
import TransactionModel from "./transactionModel";

const transactionModel: TransactionModel = new TransactionModel();

class ProductModel {
  /**
   * createProduct
   * Create a product
   * @param {object} product product object
   * @return {object}  product object
   */
  public createProduct = async (params) => {
    const newProduct = new Product(params);
    try {
      const product: ProductType = await newProduct.save();
      return product;
    } catch (error) {
      throw Error(error);
    }
  }
  /**
   * getProducts
   * Get products
   * @return {[object]} array of product object
   */
  public getProducts = async () => {

    try {
      const products: [ProductType] = await Product.find();
      const productList = products.map( (product) => {
        return product._id.toString();
      });
      const transactionList: [TransactionType] = await transactionModel.getTransactions(productList);
      const productsWithTransaction = products.map((product) => {
        const transactions = transactionList.filter((transaction) => {
          if (product._id.toString() === transaction.product.toString()) {
            return transaction;
          }
        }).map((transaction) => {
          const {_id, time, quantity } = transaction;
          return {id: _id, time, quantity };
        });
        const id = product._id.toString();
        return {id, transactions};
      });
      return productsWithTransaction;
    } catch (error) {
      throw Error(error);
    }
  }
  /**
   * getProduct
   * Get a product
   * @param {string} productId - Product Id
   * @return {object} product object
   */
  public getProduct = async (productId) => {
    try {
      const product: ProductType = await Product.findById(productId);
      const transactionList: [TransactionType] = await transactionModel.getTransactions([product]);
      const transactions = transactionList.map((transaction) => {
        const {_id, time, quantity } = transaction;
        return {id: _id, time, quantity };
      });
      const id = product._id.toString();
      return {id, transactions};
    } catch (error) {
      throw Error(error);
    }
  }
}

export default ProductModel;
