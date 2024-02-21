import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Register from "./Register";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const username = userInfo?.username;
  return (
    <header className="flex justify-between items-center py-4">
      <Link to="/" className="font-bold">
        Mi Blog
      </Link>
      <nav className="flex gap-8">
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <button onClick={() => setOpenLogoutModal(true)}>
              Logout ({username})
            </button>
          </>
        )}
        {!username && (
          <>
            <button onClick={() => setOpenLoginModal(true)}>Login</button>
            <button onClick={() => setOpenRegisterModal(true)}>Register</button>
          </>
        )}
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
