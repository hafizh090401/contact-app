import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../actions/contactActions";
import ContactUpdate from "./ContactUpdate";
import NoProfilePicture from "../image/Test.jpeg";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteFilled,
  QuestionCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Card,
  Skeleton,
  Col,
  Row,
  Badge,
  Popconfirm,
  FloatButton,
  Tooltip,
} from "antd";
import ContactForm from "./ContactForm";
const { Meta } = Card;

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShow(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchContacts());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleUpdate = (id) => {
    setShow(id);
  };

  return (
    <div>
      <span>
        <Badge count={contacts.length} offset={[30, 28]}>
          <h2>Contact List</h2>
        </Badge>
      </span>
      <FloatButton
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{
          right: 30,
          height: 60,
          width: 60,
        }}
        onClick={() => setShowModal(true)}
      />

      <ContactForm open={showModal} onClose={onClose} />
      <Row justify="space-around">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Col key={contact.id} span={7}>
              <div key={contact.id}>
                <Card
                  hoverable
                  style={{ width: 300, marginTop: 16 }}
                  cover={
                    <img
                      key="img"
                      alt=""
                      src={contact.photo}
                      style={{ height: 300, width: 300 }}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = NoProfilePicture;
                      }}
                    />
                  }
                  loading={loading}
                  actions={[
                    <EllipsisOutlined key="ellipsis" />,
                    <Tooltip title="Edit Contact">
                      <EditOutlined
                        key="edit"
                        onClick={() => handleUpdate(contact.id, contact)}
                      />
                    </Tooltip>,
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: "red",
                          }}
                        />
                      }
                    >
                      <DeleteFilled
                        key="delete"
                        style={{ color: "red" }}
                        onClick={() => handleDelete(contact.id)}
                      />
                    </Popconfirm>,
                  ]}
                >
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      title={`${contact.firstName} ${contact.lastName}`}
                      description={`Age ${contact.age} Years old`}
                    />
                  </Skeleton>
                </Card>
                {show === contact.id ? (
                  <ContactUpdate
                    id={contact.id}
                    firstNameUpdate={contact.firstName}
                    lastNameUpdate={contact.lastName}
                    ageUpdate={contact.age}
                    photoUpdate={contact.photo}
                    onClose={onClose}
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </Row>
    </div>
  );
};

export default ContactList;
