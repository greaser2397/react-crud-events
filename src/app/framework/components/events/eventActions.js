import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from './eventConstants';
import { asyncActionEnd, asyncActionError, asyncActionStart } from '../../../async/asyncReducer';
import { fetchSampleData } from '../../../api/mockApi';

export function loadEvents() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: events });
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  }
}

export function listenToEvents(events) {
  return {
    type: FETCH_EVENTS,
    payload: events
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