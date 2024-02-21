import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <Link to="/" className='font-bold'>
        Mi Blog
      </Link>
      <nav className="flex gap-8">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
