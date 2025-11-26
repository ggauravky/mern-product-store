import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

import ProductRouter from "./routes/product.route.js";

dotenv.config();

const app = express();
process.env.PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", ProductRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(pathspec.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT , () => {
  connectDB();
  console.log("server started at http://localhost:" + process.env.PORT);
});
