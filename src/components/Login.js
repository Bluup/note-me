import React, { useCallback, useState, useEffect } from "react";
import app from "../config/app";
import authentication from "../auth";
import { inputAnimation } from "../animation";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  useEffect(() => {
    inputAnimation();
  }, []);
  const [loading, setloading] = useState(false);
  const loginUser = useCallback(
    async e => {
      setloading(true);
      e.preventDefault();
      const { email, password } = e.target.elements;
      const error = document.querySelector(".error");
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        authentication.login(email.value);
        history.push("/notes");
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
    <div className="login" id="login">
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
          <h4>Sing in to NoteMe</h4> <br />
          <form onSubmit={loginUser} className="pretty">
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
            <button disabled={loading} className="btn btn-primary">
              {loading ? (
                <div>
                  Loading...{" "}
                  <div className="loading" style={{ width: "10px" }}></div>
                </div>
              ) : (
                <div>Sign In</div>
              )}
            </button>
            <div className="error"></div>
            <br />
            <p>
              Not a member? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
