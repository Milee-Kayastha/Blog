import express from "express";
import fs from "fs";
import multer from "multer";
import BlogPostModel from "../models/blogPostModel.js";
import { secret } from "../config.js";

const router = express.Router();
const uploadMiddleware = multer({ dest: "uploads/" });

router.post("/", uploadMiddleware.single("coverImg"), (req, res) => {
  if (!req.coverImg) {
    return res.status(400).json({ error: "No cover image uploaded." });
  }

  const { originalname, path } = req.coverImg;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;

  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token." });
    }

    try {
      const { title, summary, content } = req.body;
      const blog = await BlogPostModel.create({
        title,
        summary,
        content,
        coverImg: newPath,
        author: info.id,
      });
      res.json(blog);
    } catch (postError) {
      console.error(postError);
      res.status(500).json({ error: "Internal server error." });
    }
  });
});


export default router;
