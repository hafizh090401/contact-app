import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as contactActions from "../actions/contactActions";
import * as contactService from "../services/contactService";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("contactActions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should fetch contacts successfully", async () => {
    const mockContacts = [
      {
        id: 1,
        firstName: "John Doe",
        lastName: "Alexis",
        age: 32,
        photo:
          "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
      },
    ];
    moxios.stubRequest("https://contact.herokuapp.com/contact", {
      status: 200,
      response: mockContacts,
    });

    const expectedActions = [
      { type: "FETCH_CONTACTS_SUCCESS", payload: mockContacts },
    ];

    await store.dispatch(contactActions.fetchContacts());
    await store.dispatch(contactService.createContact(mockContacts));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
