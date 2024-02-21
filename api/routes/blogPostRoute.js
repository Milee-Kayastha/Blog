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

router.put("/", uploadMiddleware.single("coverImg"), async (req, res) => {
  let newPath = null;
  if (req.coverImg) {
    const { originalname, path } = req.coverImg;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err)
      return res.status(401).json({ error: "Unauthorized: Invalid token." });

    try {
      const { id, title, summary, content } = req.body;
      const blog = await BlogPostModel.findById(id);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      const isAuthor = JSON.stringify(blog.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res
          .status(403)
          .json({ error: "You are not the author of this blog!" });
      }

      const updatedPost = await BlogPostModel.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          content,
          coverImg: newPath || blog.coverImg,
        },
        { new: true }
      );

      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
});

router.get("/", async (req, res) => {
  res.json(
    await BlogPostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await BlogPostModel.findById(id).populate("author", [
    "username",
  ]);
  res.json(blog);
});

export default router;
