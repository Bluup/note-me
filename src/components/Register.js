import React, { useCallback, useState, useEffect } from "react";
import app from "../config/app";
import firebase from "firebase";
import { inputAnimation } from "../animation";
import authentication from "../auth";
import { Link } from "react-router-dom";

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
      const error = document.querySelector(".error");
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
          notes: {},
          group: ""
        });

        authentication.login(email.value);
        history.push("/welcome");
      } catch (err) {
        setloading(false);
        error.innerHTML = "There's a problem with the information provided.";
        error.style.opacity = "1";
        error.style.visibility = "visible";
      }
    },
    [history]
  );

  return (
    <div className="register" id="register">
      <div className="left">
        <Link to="/">
          <img src="/images/logo.png" alt="" />
        </Link>
      </div>
      <div className="right">
        <div>
          <Link to="/" className="brand">
            <img src="/images/logo.png" alt="" />
          </Link>{" "}
          <br />
          <h4>Sing up to NoteMe</h4> <br />
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
                  Loading...{" "}
                  <div className="loading" style={{ width: "10px" }}></div>
                </div>
              ) : (
                <div>Register</div>
              )}
            </button>
            <div className="error"></div> <br />
            <p>
              Already a member? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
