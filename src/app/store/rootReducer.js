import { combineReducers } from 'redux';
import testReducer from '../framework/sandbox/testReducer';
import eventReducer from '../framework/components/events/eventReducer';
import modalReducer from '../framework/modals/modalReducer';
import authReducer from '../framework/auth/authReducer';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modal: modalReducer,
  auth: authReducer
});

export default rootReducer;