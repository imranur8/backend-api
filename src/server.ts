import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import allRoutes from "./routes";
import typeDefs from "./typeDefs";
import logger from "./utils/logger";

const app = express();
const mongoUrl: string = "mongodb://localhost/vanila-backend";

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true }, (err) => {
  if (err) {
    logger.info(err.message);
  } else {
    logger.info(`Backend server is connected to MongoDb : ${mongoUrl}`);
  }
});

app.use(bodyParser.json());
app.use("*", cors());
app.use("/v1/api", allRoutes);
app.use(compression());

// setup apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, (): void => {
  logger.info(`API is now running on http://localhost:4000/`);
  logger.info(`🚀  GraphQL is now running on http://localhost:4000/graphql`);
});
