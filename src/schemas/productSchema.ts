import { Document, model, Schema } from "mongoose";

export interface ProductType extends Document {
  _id: string;
  name: string;
  price: string;
  createdAt: Date;
}

export const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Number,
    required: true,
    default: new Date().getTime()
  }
});
const Product = model<ProductType>("Product", productSchema);
export default Product;
