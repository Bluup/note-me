/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import authentication from "../auth";
const Home = ({ history }) => {
  useEffect(() => {
    let timer = "";
    let timer2 = "";
    timer = setTimeout(() => {
      let i = 0;
      const txt = "Keep, save, share... notes.";
      const speed = 130;
      document.querySelector(".landing_information").innerHTML = "";
      const typeWriter = () => {
        if (i < txt.length) {
          document.querySelector(
            ".landing_information"
          ).innerHTML += txt.charAt(i);
          i++;
          timer2 = setTimeout(typeWriter, speed);
        }
      };
      typeWriter();
      return () => {
        clearTimeout(timer);
      };
    }, 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);
  useEffect(() => {
    if (authentication.getUser() !== "") {
      history.push("/notes");
    }
  }, []);
  return (
    <div className="landing" id="landing">
      <Nav />
      <div className="landing_information">&nbsp;</div>
      <div>
        <Link to="/login">
          <button className="btn btn-primary rounded">Login</button>
        </Link>
        <Link to="/register">
          {" "}
          <button className="btn btn-outline-primary rounded">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
