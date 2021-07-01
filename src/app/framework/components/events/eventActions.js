import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from './eventConstants';
import { asyncActionEnd, asyncActionError, asyncActionStart } from '../../../async/asyncReducer';
import { fetchSampleData } from '../../../api/mockApi';
import { toast } from 'react-toastify';

export function loadEvents() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: events });
      dispatch(asyncActionEnd());
      toast.info('Events were loaded!');
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  }
}

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event
  }
}

export function deleteEvent(event) {
  return {
    type: DELETE_EVENT,
    payload: event
  }
}

export function updateEvent(eventId) {
  return {
    type: UPDATE_EVENT,
    payload: eventId
  }
}