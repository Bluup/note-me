import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyA66WmWcCSW1B6GAK0vfDzHpzKftsECnHE",
    authDomain: "notes-e8554.firebaseapp.com",
    databaseURL: "https://notes-e8554.firebaseio.com",
    projectId: "notes-e8554",
    storageBucket: "notes-e8554.appspot.com",
    messagingSenderId: "339934702018",
    appId: "1:339934702018:web:fb74206cdbedeb5ce68e5b"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app