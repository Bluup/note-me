import "firebase/database";
import firebase from "firebase";
import "firebase/auth";

export const get_notes = (uid, cb) => {
  firebase
    .database()
    .ref("/users/" + uid + "/notes")
    .on("value", snapshot => {
      const allNotes = [];
      if (snapshot.val() != null) {
        const keys = Object.keys(snapshot.val());
        const notes = Object.values(snapshot.val());
        for (let i = 0; i < notes.length; i++) {
          notes[i].id = keys[i];
          allNotes.push(notes[i]);
        }
        cb(allNotes);
      }
      cb(allNotes);
    });
};

export const get_members = (groupId, cb) => {
  firebase
    .database()
    .ref("/groups/" + groupId + "/users")
    .on("value", snapshot => {
      if (snapshot.val() != null) {
        cb([...snapshot.val]);
      }
      cb(null);
    });
};

export const get_note = (uid, noteId, cb) => {
  firebase
    .database()
    .ref("/users/" + uid + "/notes/" + noteId)
    .on("value", snapshot => {
      if (snapshot.val() != null) {
        const note = snapshot.val();
        note.id = noteId;
        cb(note);
      } else {
        cb(null);
      }
    });
};

export const toggle_note = (uid, noteId, value, cb) => {
  firebase
    .database()
    .ref("/users/" + uid + "/notes/" + noteId)
    .update({
      completed: !value
    });
};

export const update_note = (uid, noteId, title, text, cb) => {
  firebase
    .database()
    .ref("/users/" + uid + "/notes/" + noteId)
    .update({
      title,
      text
    });
};

export const add_note = async (noteData, uid) => {
  await firebase
    .database()
    .ref("users/" + uid + "/notes")
    .push({
      title: noteData.title,
      text: noteData.text,
      date: noteData.date,
      completed: noteData.completed
    });
};
export const add_member = async (memberEmail, groupId, uid) => {
  // let mainEmail = "";
  // firebase
  //   .database()
  //   .ref("/users/" + uid)
  //   .on("value", snapshot => {
  //     mainEmail = snapshot.val().email;
  //   });
  // await firebase;
  // // .database()
  // // .ref("groups/" + groupId + "/users")
  // // .once("value", snapshot => {
  // //   if (snapshot.val() !== null) {
  // //     const email = [...snapshot.val()];
  // //     let memberUid = "";
  // //     admin
  // //       .auth()
  // //       .getUserByEmail(memberEmail)
  // //       .then(function(userRecord) {
  // //         const memberInfo = userRecord.toJSON();
  // //         memberUid = memberInfo.uid;
  // //         console.log(memberInfo);
  // //       });
  // //     if (memberUid != "") {
  // //       if (!email.some(user => user === email)) {
  // //         firebase
  // //           .database()
  // //           .ref("groups/" + groupId + "/users")
  // //           .push({
  // //             memberEmail,
  // //             mainEmail
  // //           });
  // //         firebase
  // //           .database()
  // //           .ref("users/" + memberUid + "/group")
  // //           .push({
  // //             groupId
  // //           });
  // //         firebase
  // //           .database()
  // //           .ref("users/" + mainEmail + "/group")
  // //           .push({
  // //             groupId
  // //           });
  // //       } else {
  // //         firebase
  // //           .database()
  // //           .ref("groups/" + groupId + "/users")
  // //           .push({
  // //             memberEmail
  // //           });
  // //         firebase
  // //           .database()
  // //           .ref("users/" + memberUid + "/group")
  // //           .push({
  // //             groupId
  // //           });
  // //       }
  // //     }
  // //   } else {
  // //     let memberUid = "";
  // //     admin
  // //       .auth()
  // //       .getUserByEmail(memberEmail)
  // //       .then(userRecord => {
  // //         const memberInfo = userRecord.toJSON();
  // //         memberUid = memberInfo.uid;
  // //         console.log(memberInfo);
  // //       });
  // //     if (memberUid != "") {
  // //       firebase
  // //         .database()
  // //         .ref("groups/" + groupId + "/users")
  // //         .push({
  // //           memberEmail
  // //         });
  // //       firebase
  // //         .database()
  // //         .ref("users/" + memberUid + "/group")
  // //         .push({
  // //           groupId
  // //         });
  // //     }
  // //   }
  // // });
};

export const delete_note = async (uid, noteId, cb) => {
  try {
    await firebase
      .database()
      .ref("users/" + uid + "/notes/" + noteId)
      .remove();
    cb(true);
  } catch (err) {
    cb(false);
  }
};
