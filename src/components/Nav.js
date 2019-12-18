import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav id="landing_nav">
      <Link to="/">
        <img src="/images/logo.png" alt="" />
      </Link>
    </nav>
  );
};

export default Nav;
