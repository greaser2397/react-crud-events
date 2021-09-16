import { SIGN_IN_USER, SIGN_OUT_USER, SWITCH_LANGUAGE } from './authConstants';
import firebase from '../../config/firebase';
import { APP_LOADED } from '../../async/asyncReducer';
import { dataFromSnapshot, getUserProfile } from '../../firestore/firestoreService';
import { listenToCurrentUserProfile } from '../components/profile/profileActions';

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user
  }
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(signInUser(user));
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot(snapshot => {
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)))
          dispatch({ type: APP_LOADED });
        });

      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    })
  }
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER
  }
}

export function switchLanguage(lang) {
  return {
    type: SWITCH_LANGUAGE,
    payload: lang
  }
}