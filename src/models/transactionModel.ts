import Product, { ProductType } from "../schemas/productSchema";
import Transaction, { TransactionType } from "../schemas/transactionSchema";

class TransactionModel {
  /**
   * createTransaction
   * Create a transaction
   * @param {object} transaction transaction object
   * @return {object}  transaction object
   */
  public createTransaction = async (params) => {
    const { product } = params;
    if (!product) { throw Error("Product id required."); }
    const productExist: ProductType = await Product.findById(product);
    if (productExist) {
      const newTransaction = new Transaction(params);
      try {
        const transaction: TransactionType = await newTransaction.save();
        return transaction;
      } catch (error) {
        throw Error(error);
      }
    } else {
      throw Error(`Product id:${product} doesn't exist`);
    }
  }
  /**
   * getTransactions
   * Get transactions
   * @param {[string]} productList array of product list
   * @return {[object]} array of transaction object
   */
  public getTransactions = async (productList) => {
    try {
      return await Transaction.find({ product: { $in: productList } });
    } catch (error) {
      throw Error(error.toString());
    }
  }
}

export default TransactionModel;
