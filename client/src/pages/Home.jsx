import React, { useEffect, useState } from "react";
import { backend_url } from "../../config";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getBlogPosts = () => {
    fetch(backend_url + "post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  return <>{posts.length > 0 && posts.map((post) => <BlogCard {...post} />)}</>;
};

export default Home;
