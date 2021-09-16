import { SIGN_IN_USER, SIGN_OUT_USER, SWITCH_LANGUAGE } from './authConstants';
import { LOCATION_CHANGE } from 'connected-react-router';
import i18n from 'i18next';

const initialState = {
  authenticated: false,
  currentUser: null,
  prevLocation: null,
  currentLocation: null,
  lang: i18n.language || 'en'
}

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
        }
      }
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        prevLocation: state.currentLocation,
        currentLocation: payload.location
      }
    case SWITCH_LANGUAGE:
      return {
        ...state,
        lang: payload
      }
    default:
      return state;
  }
}