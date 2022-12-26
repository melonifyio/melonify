import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDtYOVd54GQ8cAH7WbS0vTqIr3l6FKy92U",
  authDomain: "melon-ui-7f38c.firebaseapp.com",
  databaseURL: "https://melon-ui-7f38c-default-rtdb.firebaseio.com",
  projectId: "melon-ui-7f38c",
  storageBucket: "melon-ui-7f38c.appspot.com",
  messagingSenderId: "637780633306",
  appId: "1:637780633306:web:a003cc825a9f09c067a7e3",
  measurementId: "G-HFL9PNPK72",
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
