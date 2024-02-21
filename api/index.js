import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  res.json("ok");
});

app.listen(PORT);
