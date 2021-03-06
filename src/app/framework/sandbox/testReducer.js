import { asyncActionEnd, asyncActionError, asyncActionStart } from '../../async/asyncReducer';
import { delay } from '../util/Util';
import { toast } from 'react-toastify';

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: INCREMENT_COUNTER, payload: amount });
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError(error));
    }

  }
}

export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: DECREMENT_COUNTER, payload: amount });
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError(error));
      toast.error(error);
    }
  }
}

const initialState = {
  data: 42,
}

function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload
      }
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload
      }
    default:
      return state
  }
}

export default testReducer;