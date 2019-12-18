import React from "react";
import { Link } from "react-router-dom";
const NavNotes = props => {
  return (
    <div className="navNotes" id="navNotes">
      <Link to="/notes" id="mynotes-link" className="active left-active">
        My Notes
      </Link>
      <Link id="shared-link" to="/shared-notes">
        Shared Notes
      </Link>
    </div>
  );
};

export default NavNotes;
