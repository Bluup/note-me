import React, { useCallback, useState, useEffect } from "react";
import Nav from "./Nav";
import app from "../config/app";
import firebase from "firebase";
import { inputAnimation } from "../animation";
import authentication from "../auth";

const Register = ({ history }) => {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    inputAnimation();
  }, []);
  const registerUser = useCallback(
    async e => {
      setloading(true);
      e.preventDefault();
      const { email, password } = e.target.elements;
      const database = firebase.database();
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        await database.ref("users/" + firebase.auth().currentUser.uid).set({
          email: email.value,
          notes: {}
        });
        authentication.login(email.value);
        history.push("/welcome");
      } catch (error) {
        setloading(false);
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="register" id="register">
      <Nav />
      <form onSubmit={registerUser} className="pretty">
        <div className="form-group">
          <label htmlFor="emailRegister">Email</label>
          <input
            type="email"
            name="email"
            id="emailRegister"
            autoComplete="off"
            required
            className="form-control input-animated"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordRegister">Password</label>
          <input
            type="password"
            name="password"
            id="passwordRegister"
            required
            className="form-control input-animated"
          />
        </div>
        <button disabled={loading} className="btn btn-primary btn-block">
          {loading ? (
            <div>
              Loading... <div className="loading"></div>
            </div>
          ) : (
            <div>Register</div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
