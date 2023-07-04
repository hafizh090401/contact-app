import axios from "axios";

const API_URL = "https://contact.herokuapp.com/contact";

export const fetchContactsSuccess = (contacts) => ({
  type: "FETCH_CONTACTS_SUCCESS",
  payload: contacts,
});

export const addContactSuccess = (contact) => ({
  type: "ADD_CONTACT_SUCCESS",
  payload: contact,
});

export const updateContactSuccess = (contact) => ({
  type: "UPDATE_CONTACT_SUCCESS",
  payload: contact,
});

export const deleteContactSuccess = (id) => ({
  type: "DELETE_CONTACT_SUCCESS",
  payload: id,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

export const fetchContacts = () => {
  return (dispatch) => {
    return axios
      .get(API_URL)
      .then((response) => {
        dispatch(fetchContactsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };
};

export const addContact = (contact) => {
  return (dispatch) => {
    return axios
      .post(API_URL, contact)
      .then((response) => {
        dispatch(addContactSuccess(contact));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };
};

export const updateContact = (id, contact) => {
  return (dispatch) => {
    return axios
      .put(`${API_URL}/${id}`, contact)
      .then((response) => {
        dispatch(updateContactSuccess({ id, ...contact }));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };
};

export const deleteContact = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        dispatch(deleteContactSuccess(id));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };
};
