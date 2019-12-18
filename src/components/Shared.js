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
  const [groupdId, setGroupdId] = useState("");
  useEffect(() => {
    inputAnimation();
    app.auth().onAuthStateChanged(async user => {
      setloading(true);
      if (user) {
        await firebase
          .database()
          .ref("/users/" + user.uid)
          .once("value", async snapshot => {
            if (snapshot.val().group == null || snapshot.val().group === "") {
              const uniqid = Date.now();
              await setGroupdId(uniqid);
              get_members(uniqid, user.uid, members => {
                setMembers(members);
              });
            } else {
              setGroupdId(snapshot.val().group);
              get_members(snapshot.val().group, user.uid, members => {
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
    const memberEmailValue = memberEmail.value;
    Context.dispatch({
      type: "ADD_MEMBER",
      payload: {
        memberEmailValue,
        groupdId
      }
    });
    memberEmail.value = "";
  };
  const deleteMember = (uid, groupId) => {
    Context.dispatch({
      type: "DELETE_MEMBER",
      payload: { uid, groupId }
    });
  };
  return (
    <div className="shared" id="shared">
      <div className="bar"></div>
      <h4>Add a memeber</h4> <br />
      <form className="pretty">
        <div className="form-group">
          <label htmlFor="emailMember">Write your friend's email</label>
          <input
            id="emailMember"
            type="text"
            className="form-control input-animated"
          />
          <button onClick={addMember} name="addMember"></button>
        </div>
      </form>
      <br /> <br />
      <div className="shared-panel">
        <h4>My Team</h4> <br />
        <div className="shared-list">
          {loading ? (
            <div className="fullLoader">
              <div className="loading-primary"></div>
            </div>
          ) : members.length > 0 ? (
            <div>
              {members.map(member => (
                <div className="singleMember" key={member.uid}>
                  <div>{member.email}</div>
                  <button
                    onClick={() => {
                      deleteMember(member.uid, groupdId);
                    }}
                    name="deleteMember"
                  ></button>
                </div>
              ))}
            </div>
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shared;
