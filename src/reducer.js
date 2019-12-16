import "firebase/database";
import "firebase/auth";
import app from "./config/app";
import firebase from "firebase";
import {
  add_note,
  toggle_note,
  delete_note,
  update_note,
  add_member
} from "./helpers/functions";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const { title, text } = action.payload;
      const newNote = {
        id: Date.now(),
        title,
        text,
        date: Date.now(),
        completed: false
      };
      app.auth().onAuthStateChanged(user => {
        if (user) {
          add_note(newNote, user.uid);
          return state;
          // return [...state, newNote];
        }
      });
      return state;
    }
    case "ADD_MEMBER": {
      const { memberEmail } = action.payload;
      app.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .database()
            .ref("/users/" + user.uid)
            .on("value", snapshot => {
              if (snapshot.val().group == null) {
                const id = Date.now();
                add_member(memberEmail, id, user.uid);
                return state;
              } else {
                add_member(memberEmail, snapshot.val().group, user.uid);
                return state;
              }
            });
        }
      });
      return state;
    }
    case "DELETE_NOTE": {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          delete_note(user.uid, action.payload, response => {});
          return state;
        }
      });
      return state;
    }
    case "TOGGLE_COMPLETED": {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          const value = action.payload.value;
          toggle_note(user.uid, action.payload.id, value);
          return state;
        }
      });
      return state;
    }
    case "EDIT_NOTE": {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          update_note(
            user.uid,
            action.payload.id,
            action.payload.title,
            action.payload.text,
            () => {}
          );
          return state;
        }
      });
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
