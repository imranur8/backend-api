import { Document, model, Schema } from "mongoose";

export interface TransactionType extends Document {
  _id: string;
  product: string;
  quantity: number;
  time: number;
}

export const transactionSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product"
  },
  quantity: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true,
    default: new Date().getTime()
  }
});
const Transaction = model<TransactionType>("Transaction", transactionSchema);
export default Transaction;
