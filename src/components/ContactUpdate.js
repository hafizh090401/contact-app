import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../actions/contactActions";
import { Button, Drawer, Space, Input, message } from "antd";
import { UserOutlined, AuditOutlined, GlobalOutlined } from "@ant-design/icons";

const ContactUpdate = ({
  id,
  firstNameUpdate,
  lastNameUpdate,
  ageUpdate,
  photoUpdate,
  onClose,
}) => {
  const [firstName, setfirstName] = useState(firstNameUpdate);
  const [lastName, setlastName] = useState(lastNameUpdate);
  const [age, setAge] = useState(ageUpdate);
  const [photo, setPhoto] = useState(photoUpdate);

  const success = () => {
    message.success("Berhasil Merubah Data");
  };

  const dispatch = useDispatch();
  const handleUpdate = (e) => {
    e.preventDefault();
    const body = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: photo,
    };
    success();
    dispatch(updateContact(id, body));
    onClose();
  };
  console.log(firstName, firstNameUpdate);

  return (
    <Drawer
      title="Drawer with extra actions"
      placement="right"
      width={500}
      onClose={onClose}
      open
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Space>
      }
    >
      <form onSubmit={handleUpdate}>
        <Space direction="vertical" size="middle">
          <Space.Compact size="large">
            <Input
              addonBefore={<UserOutlined />}
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </Space.Compact>
          <Space.Compact>
            <Input
              addonBefore={<AuditOutlined />}
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Space.Compact>
          <Space.Compact>
            <Input
              addonBefore={<GlobalOutlined />}
              placeholder="Add Your Photo URL"
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              required
            />
          </Space.Compact>
        </Space>
      </form>
    </Drawer>
  );
};

export default ContactUpdate;
