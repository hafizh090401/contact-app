import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../actions/contactActions";
import { Space, Input, Modal, message } from "antd";
import { UserOutlined, AuditOutlined, GlobalOutlined } from "@ant-design/icons";

const ContactForm = ({ open, onClose }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [photo, setPhoto] = useState("");

  const success = () => {
    message.success("Berhasil Merubah Data");
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      firstName,
      lastName,
      age: Number(age),
      photo,
    };
    dispatch(addContact(newContact));
    setfirstName("");
    setlastName("");
    success();
    onclose();
  };

  return (
    <Modal
      title="Add New Contacts"
      centered
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Space direction="vertical" size="middle">
          <Space.Compact size="large">
            <Input
              addonBefore={<UserOutlined />}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </Space.Compact>
          <Space.Compact>
            <Input
              addonBefore={<AuditOutlined />}
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <Input
              addonBefore={<GlobalOutlined />}
              type="text"
              placeholder="Add Your Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              required
            />
          </Space.Compact>
        </Space>
      </form>
    </Modal>
  );
};

export default ContactForm;
