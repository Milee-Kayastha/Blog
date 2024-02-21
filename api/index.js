import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;
const MONGO_URL =
  "mongodb+srv://milee:bangtan7@milee.zy2zgir.mongodb.net/Node-API?retryWrites=true&w=majority";

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => console.log(`Listening on port ${port}...`));
  })
  .catch((error) => {
    console.log(error);
  });
