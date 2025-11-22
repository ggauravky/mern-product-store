import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

import ProductRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", ProductRouter);

app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
