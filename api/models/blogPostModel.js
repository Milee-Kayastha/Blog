import mongoose, { Schema } from "mongoose";

const blogPostSchema = mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BlogPostModel = mongoose.model("BlogPost", blogPostSchema);

export default BlogPostModel;
