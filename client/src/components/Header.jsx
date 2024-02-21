import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Register from "./Register";
import { UserContext } from "../context/UserContext";
import Logout from "./Logout";
import { backend_url } from "../../config";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const username = userInfo?.username;

  const getUserProfile = async () => {
    try {
      const response = await fetch(backend_url + "userProfile", {
        credentials: "include",
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
      } else {
        console.error("Failed to fetch user profile:", response);
      }
    } catch (error) {
      console.error("An error occurred while fetching user profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
      {openLogoutModal && (
        <Logout
          onOpen={openLogoutModal}
          onClose={() => setOpenLogoutModal(false)}
        />
      )}
    </header>
  );
};

export default Header;
