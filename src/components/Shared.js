import React, { useEffect, useContext, useState } from "react";
import { inputAnimation } from "../animation";
import UserContext from "../UserContext";
import app from "../config/app";
import { get_members } from "../helpers/functions";
import "firebase/database";
import firebase from "firebase";
import "firebase/auth";

const Shared = props => {
  const Context = useContext(UserContext);

  const [loading, setloading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    inputAnimation();
    app.auth().onAuthStateChanged(user => {
      setloading(true);
      if (user) {
        firebase
          .database()
          .ref("/users/" + user.uid)
          .on("value", snapshot => {
            if (snapshot.val().group == null) {
              setMembers([]);
            } else {
              get_members(snapshot.val().group, members => {
                setMembers(members);
              });
            }
          });
      }
      setTimeout(() => {
        setloading(false);
      }, 1000);
    });
  }, []);

  const addMember = e => {
    e.preventDefault();
    const memberEmail = document.getElementById("emailMember");
    const error = document.querySelector(".error");
    if (memberEmail.value === "") {
      error.style.opacity = "1";
      error.style.visibility = "visible";
      error.innerHTML = "Seems like something's missing";
      return;
    }
    error.style.opacity = "0";
    error.style.visibility = "hidden";

    Context.dispatch({
      type: "ADD_MEMBER",
      payload: memberEmail
    });
  };

  return (
    <div className="shared" id="shared">
      <div className="bar"></div>
      <h4>Add a memeber</h4>
      <form className="pretty">
        <div className="form-group">
          <label htmlFor="emailMember">Write you friend's email</label>
          <input
            id="emailMember"
            type="text"
            className="form-control input-animated"
          />
          <button name="addMember"></button>
        </div>
      </form>{" "}
      <br /> <br />
      <div className="shared-panel">
        <h4>My Team</h4>
        <div className="shared-list">
          {loading ? (
            <div className="fullLoader">
              <div className="loading-primary"></div>
            </div>
          ) : members.length > 0 ? (
            <div>asd</div>
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shared;
