import { Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { backend_url } from "../../config";
import { UserContext } from "../context/UserContext";

const Login = ({ onOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backend_url + "login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  };
  return (
    <Modal open={onOpen} onCancel={onClose} footer={null}>
      <form className="login" onSubmit={loginUser}>
        <span className="text-lg">Login</span>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </Modal>
  );
};

export default Login;
