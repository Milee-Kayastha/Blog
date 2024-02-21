import React from "react";
import { formatISO9075 } from "date-fns";
import { backend_url } from "../../config";

const BlogCard = ({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) => {
  return (
    <div className="grid">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={backend_url + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default BlogCard;
