import express from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const router = express.Router();
const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await UserModel.create({
        username,
        password: hashedPassword,
      });
      res.json(user);
    } catch (err) {
      console.error(err);
      if (err.code === 11000) { // Duplicate key error (unique constraint violation)
        res.status(400).json({ error: "Username already exists" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      const token = jwt.sign({ username, id: user._id }, secret);
      res.cookie("token", token, { httpOnly: true }).json({
        id: user._id,
        username,
      });
    } else {
      res.status(400).json({ error: "Wrong credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
