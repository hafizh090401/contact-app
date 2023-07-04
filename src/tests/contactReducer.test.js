import contactReducer from '../reducers/contactReducer';

describe('contactReducer', () => {
  const initialState = {
    contacts: [],
    error: null,
  };

  it('should handle FETCH_CONTACTS_SUCCESS', () => {
    const mockContacts = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

    const action = {
      type: 'FETCH_CONTACTS_SUCCESS',
      payload: mockContacts,
    };

    const expectedState = {
      ...initialState,
      contacts: mockContacts,
      error: null,
    };

    expect(contactReducer(initialState, action)).toEqual(expectedState);
  });

  // Write similar tests for other actions
});
