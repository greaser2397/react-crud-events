import { combineReducers } from 'redux';
import testReducer from '../framework/sandbox/testReducer';
import eventReducer from '../framework/components/events/eventReducer';
import modalReducer from '../framework/modals/modalReducer';
import authReducer from '../framework/auth/authReducer';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modal: modalReducer,
  auth: authReducer,
  async: asyncReducer
});

export default rootReducer;