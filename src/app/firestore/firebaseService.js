import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';
import { toast } from 'react-toastify';

export function signInWithEmail(credentials) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerInFirebase(credentials) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);

    await result.user.updateProfile({
      displayName: credentials.displayName
    });
    return await setUserProfileData(result.user);

  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;

  if (selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  if (selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }

  } catch (error) {
    toast.error(error.message);
  }
}

export function updateUserPassword(credentials) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(credentials.newPassword);
}