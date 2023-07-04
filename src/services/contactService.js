import Axios from 'axios';

const API_URL = 'https://contact.herokuapp.com/contact';

export const getContacts = () => {
  return Axios.get(API_URL);
};

export const createContact = (contact) => {
  return Axios.post(API_URL, contact);
};

export const updateContact = (id, contact) => {
  return Axios.put(`${API_URL}/${id}`, contact);
};

export const deleteContact = (id) => {
  return Axios.delete(`${API_URL}/${id}`);
};
