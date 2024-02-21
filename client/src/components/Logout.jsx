import { Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { backend_url } from "../../config";
import { UserContext } from "../context/UserContext";

const Logout = ({ onOpen, onClose }) => {
  const { setUserInfo } = useContext(UserContext);
  const logoutUser = async () => {
    try {
      await fetch(backend_url + "logout", {
        method: "POST",
        credentials: "include",
      });

      setUserInfo(null);
      onClose();
    } catch (error) {
      message.error("An error occurred during logout");
    }
  };

  return (
    <Modal open={onOpen} onOk={logoutUser} okText="Confirm" onCancel={onClose}>
      <span>Are you sure you want to logout?</span>
    </Modal>
  );
};

export default Logout;
