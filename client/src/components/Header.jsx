import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import { Button } from "antd";
import Login from "../pages/Login";

const Header = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <header className="flex justify-between items-center py-4">
      <Link to="/" className="font-bold">
        Mi Blog
      </Link>
      <nav className="flex gap-8">
        <button onClick={() => setOpenLoginModal(true)}>Login</button>
        <button onClick={() => setOpenRegisterModal(true)}>Register</button>
      </nav>
      {openRegisterModal && (
        <Register
          onOpen={openRegisterModal}
          onClose={() => setOpenRegisterModal(false)}
        />
      )}
      {openLoginModal && (
        <Login
          onOpen={openLoginModal}
          onClose={() => setOpenLoginModal(false)}
        />
      )}
    </header>
  );
};

export default Header;
