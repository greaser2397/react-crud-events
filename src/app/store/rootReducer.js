import { combineReducers } from 'redux';
import testReducer from '../framework/sandbox/testReducer';
import eventReducer from '../framework/components/events/eventReducer';

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer
});

export default rootReducer;