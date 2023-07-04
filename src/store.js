import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../contact-app/src/reducers/contactReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
