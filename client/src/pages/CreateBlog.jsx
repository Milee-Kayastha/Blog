import React, { useState } from "react";
import { backend_url } from "../../config";
import { message } from "antd";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    summary: "",
    content: "",
    coverImg: "",
  });
  const [files, setFiles] = useState("");

  const createNewBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", blogData.title);
    formData.set("summary", blogData.summary);
    formData.set("content", blogData.content);
    formData.set("coverImg", files[0]);
    console.log("blog data", files[0]);
    try {
      const response = await fetch(backend_url + "blog", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        message.success("Blog added successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Failed to add blog");
        console.error(errorData);
      }
    } catch (error) {
      console.error("An error occurred during blog creation", error);
      message.error(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };
  const setContent = (a) => {
    console.log(a);
  };
  return (
    <div>
      <form onSubmit={createNewBlog}>
        <input
          type="title"
          name="title"
          placeholder={"Title"}
          value={blogData.title}
          onChange={handleChange}
          required
        />
        <input
          type="summary"
          name="summary"
          placeholder={"Summary"}
          value={blogData.summary}
          onChange={handleChange}
          required
        />
        <input
          name="coverImg"
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          required
        />
        <Editor value={blogData.content} onChange={setContent} />
        <button style={{ marginTop: "5px" }}>Create post</button>
      </form>
    </div>
  );
};

export default CreateBlog;
