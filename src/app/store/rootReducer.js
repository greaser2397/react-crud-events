import { combineReducers } from 'redux';
import testReducer from '../framework/sandbox/testReducer';
import eventReducer from '../framework/components/events/eventReducer';
import modalReducer from '../framework/modals/modalReducer';
import authReducer from '../framework/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import profileReducer from '../framework/components/profile/profileReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  test: testReducer,
  event: eventReducer,
  modal: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: profileReducer
});

export default rootReducer;