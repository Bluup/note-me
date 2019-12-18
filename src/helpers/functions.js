/* eslint-disable eqeqeq */
import "firebase/database";
import firebase from "firebase";
import "firebase/auth";

export const get_notes = (uid, group, gropuId = 0, cb) => {
  let ref = "";
  if (group) {
    ref = "/groups/" + gropuId + "/notes";
  } else {
    ref = "/users/" + uid + "/notes";
  }
  firebase
    .database()
    .ref(ref)
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

export const get_groupId = (uid, cb) => {
  firebase
    .database()
    .ref("users/" + uid + "/group")
    .on("value", snapshot => {
      cb(snapshot.val());
    });
};

export const get_members = (groupId, userUid, cb) => {
  firebase
    .database()
    .ref("/groups/" + groupId + "/users")
    .on("value", snapshot => {
      const members = [];
      if (snapshot.val() != null) {
        const keys = Object.keys(snapshot.val());
        const values = Object.values(snapshot.val());
        let i = 0;
        values.forEach(member => {
          if (keys[i] != userUid) {
            members[i] = { uid: keys[i], email: member.email };
          }
          i++;
        });
      }
      cb(members);
    });
};

export const get_note = (uid, noteId, groupId, cb) => {
  let ref = "";
  if (groupId) {
    ref = "groups/" + groupId + "/notes/" + noteId;
  } else {
    ref = "users/" + uid + "/notes/" + noteId;
  }
  firebase
    .database()
    .ref(ref)
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

export const toggle_note = (uid, noteId, value, groupId, cb) => {
  let ref = "";
  if (groupId) {
    ref = "groups/" + groupId + "/notes/" + noteId;
  } else {
    ref = "/users/" + uid + "/notes/" + noteId;
  }
  firebase
    .database()
    .ref(ref)
    .update({
      completed: !value
    });
};

export const update_note = (uid, noteId, title, text, groupId, cb) => {
  let ref = "";
  if (groupId) {
    ref = "groups/" + groupId + "/notes/" + noteId;
  } else {
    ref = "/users/" + uid + "/notes/" + noteId;
  }
  firebase
    .database()
    .ref(ref)
    .update({
      title,
      text
    });
};

export const add_note = async (noteData, uid, groupId) => {
  let ref = "";
  if (groupId) {
    ref = "groups/" + groupId + "/notes";
  } else {
    ref = "users/" + uid + "/notes";
  }
  let email = "";
  await firebase
    .database()
    .ref("users/" + uid)
    .once("value", snapshot => {
      email = snapshot.val().email;
    });
  await firebase
    .database()
    .ref(ref)
    .push({
      title: noteData.title,
      text: noteData.text,
      date: noteData.date,
      completed: noteData.completed,
      by: {
        uid,
        email
      }
    });
};

export const add_member = async (memberEmail, groupId, uid) => {
  let mainEmail = "";
  const groupUid = groupId;
  firebase
    .database()
    .ref("/users/" + uid)
    .on("value", snapshot => {
      mainEmail = snapshot.val().email;
    });

  await firebase
    .database()
    .ref("users/")
    .once("value", snapshot => {
      const usersUid = Object.keys(snapshot.val());
      const usersInfo = Object.values(snapshot.val());
      let i = 0;
      usersInfo.forEach(userInfo => {
        usersInfo[i].uid = usersUid[i];
        i++;
      });
      const memberInfo = usersInfo.filter(
        member => member.email === memberEmail && member.email !== mainEmail
      );
      if (memberInfo.length > 0) {
        firebase
          .database()
          .ref("groups/" + groupUid)
          .once("value", snapshot => {
            if (snapshot.val() == null) {
              firebase
                .database()
                .ref("groups/" + groupUid + "/users/" + memberInfo[0].uid)
                .set({
                  email: memberEmail
                });
              firebase
                .database()
                .ref("groups/" + groupUid + "/users/" + uid)
                .set({
                  email: mainEmail
                });
              firebase
                .database()
                .ref("users/" + memberInfo[0].uid)
                .update({
                  group: groupUid
                });
              firebase
                .database()
                .ref("users/" + uid)
                .update({
                  group: groupUid
                });
            } else {
              let emails = Object.values(Object.values(snapshot.val())[0]);
              emails = Object.values(...emails);
              if (
                emails.some(email => email === memberEmail) ||
                memberEmail === mainEmail
              ) {
              } else {
                firebase
                  .database()
                  .ref("groups/" + groupUid + "/users/" + memberInfo[0].uid)
                  .set({
                    email: memberEmail
                  });
                firebase
                  .database()
                  .ref("users/" + memberInfo[0].uid)
                  .update({
                    group: groupUid
                  });
              }
            }
          });
      }
    });
};

export const delete_member = async (uid, groupId) => {
  await firebase
    .database()
    .ref("groups/" + groupId + "/users/" + uid)
    .remove();
  await firebase
    .database()
    .ref("/users/" + uid)
    .update({
      group: ""
    });
};

export const delete_note = async (uid, noteId, groupId, cb) => {
  let ref = "";
  if (groupId) {
    ref = "groups/" + groupId + "/notes/" + noteId;
  } else {
    ref = "users/" + uid + "/notes/" + noteId;
  }
  try {
    await firebase
      .database()
      .ref(ref)
      .remove();
    cb(true);
  } catch (err) {
    cb(false);
  }
};
