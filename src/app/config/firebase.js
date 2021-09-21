import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-crud-events.firebaseapp.com",
  projectId: "react-crud-events",
  storageBucket: "react-crud-events.appspot.com",
  messagingSenderId: "786276188319",
  appId: "1:786276188319:web:db5d6e6f63f78e1b6ea2aa"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;