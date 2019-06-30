import productResolver from "./productResolver";
const GMR = require("graphql-merge-resolvers");

export default  GMR.merge([
  productResolver
]);
