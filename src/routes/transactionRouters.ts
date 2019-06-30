import { Router } from "express";
import { createTransaction } from "../controllers/transactionController";

const transactionRouter = Router();

transactionRouter.route("/transactions")
  .post(createTransaction);

export default transactionRouter;
