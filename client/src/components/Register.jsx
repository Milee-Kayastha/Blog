import React, { useState } from "react";
import { backend_url } from "../../config";
import { Modal, message } from "antd";

const Register = ({ onOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch(backend_url + "register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      message.success("Registration successful");
    } else {
      message.error("Registration failed");
    }
  };
  return (
    <Modal open={onOpen} onCancel={onClose} footer={null}>
      <form className="register" onSubmit={registerUser}>
        <span className="text-lg">Register</span>
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
        <button>Register</button>
      </form>
    </Modal>
  );
};

export default Register;
