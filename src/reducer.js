import "firebase/database";
import "firebase/auth";
import app from "./config/app";
import firebase from "firebase";
import {
  add_note,
  toggle_note,
  delete_note,
  update_note,
  add_member,
  delete_member
} from "./helpers/functions";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const { title, text, groupId } = action.payload;
      const newNote = {
        id: Date.now(),
        title,
        text,
        date: Date.now(),
        completed: false
      };
      app.auth().onAuthStateChanged(user => {
        if (user) {
          add_note(newNote, user.uid, groupId);
          return state;
        }
      });
      return state;
    }
    case "ADD_MEMBER": {
      const memberEmail = action.payload.memberEmailValue;
      app.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .database()
            .ref("/users/" + user.uid)
            .once("value", snapshot => {
              if (snapshot.val().group === "" || snapshot.val().group == null) {
                add_member(memberEmail, action.payload.groupdId, user.uid);
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
    case "DELETE_MEMBER": {
      delete_member(action.payload.uid, action.payload.groupId);
      return state;
    }
    case "DELETE_NOTE": {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          delete_note(
            user.uid,
            action.payload.id,
            action.payload.groupId,
            response => {}
          );
          return state;
        }
      });
      return state;
    }
    case "TOGGLE_COMPLETED": {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          const value = action.payload.value;
          toggle_note(
            user.uid,
            action.payload.id,
            value,
            action.payload.groupId
          );
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
            action.payload.groupId,
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
