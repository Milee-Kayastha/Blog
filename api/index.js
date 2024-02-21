import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import blogPostRoute from "./routes/blogPostRoute.js";

const app = express();
const PORT = 4000;
const MONGO_URL =
  "mongodb+srv://milee:bangtan7@milee.zy2zgir.mongodb.net/Node-API?retryWrites=true&w=majority";
const __dirname = new URL(".", import.meta.url).pathname;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", authRoute);
app.use("/blog", blogPostRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch((error) => {
    console.log(error);
  });
