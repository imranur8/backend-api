import { gql } from "apollo-server-express";

const productTypeDefs = gql`
  type Subscription {
    products: Product
  }

  type Query {
    products: [Product]
    product(id:String): Product
  }

  type Transaction {
    id: String!
    quantity: Float!
    time: String
  }
  type Product {
    id: String!
    name: String!
    price: Float!
    createdAt: String
    transactions:[Transaction]
  }

  type Mutation {
    addProduct(name: String, price: Float): Product
  }
`;

export default productTypeDefs;
