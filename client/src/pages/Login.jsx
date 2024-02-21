import React, { useState } from "react";
import { backend_url } from "../../config";
import { Modal, message } from "antd";

const Login = ({ onOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(backend_url + "login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      message.success("Login successful");
    } else {
      message.error("Login failed");
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
