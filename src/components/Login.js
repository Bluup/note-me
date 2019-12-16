import React, { useCallback, useState, useEffect } from "react";
import Nav from "./Nav";
import app from "../config/app";
import authentication from "../auth";
import { inputAnimation } from "../animation";

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
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        authentication.login(email.value);
        history.push("/notes");
      } catch (error) {
        setloading(false);
        alert(error);
      }
    },
    [history]
  );
  return (
    <div className="login" id="login">
      <Nav />
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
        <button disabled={loading} className="btn btn-primary btn-block">
          {loading ? (
            <div>
              Loading... <div className="loading"></div>
            </div>
          ) : (
            <div>Login</div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
