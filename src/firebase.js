import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4SxFXnKaLyU7HNiV6F_P86IIEJqeDAXs",
  authDomain: "react-chat-app-1e139.firebaseapp.com",
  projectId: "react-chat-app-1e139",
  storageBucket: "react-chat-app-1e139.appspot.com",
  messagingSenderId: "541586613788",
  appId: "1:541586613788:web:ddcd26e4cdbd04d2e8e1d9",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

export { auth, db };
