import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';
import { toast } from 'react-toastify';

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map(e => Object.assign({}, e[1], { id: e[0] }));
  }
}

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

export function uploadToFirebaseStorage(file, filename) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${ user.uid }/user_images/${ filename }`).put(file);
}

export function deleteFromFirebaseStorage(filename) {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${ userUid }/user_images/${ filename }`);
  return photoRef.delete();
}

export function addEventChatComment(eventId, values) {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId
  }

  return firebase.database().ref(`chat/${ eventId }`).push(newComment);
}

export function getEventChatRef(eventId) {
  return firebase.database().ref(`chat/${ eventId }`).orderByKey();
}

export function getUserFeedRef() {
  const user = firebase.auth().currentUser;
  return !user ? null : firebase.database().ref(`posts/${ user.uid }`).orderByKey().limitToLast(5);
}