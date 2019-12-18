import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { inputAnimation } from "../animation";
import GroupContext from "../GroupContext";

const NewNote = () => {
  const groupId = useContext(GroupContext);
  useEffect(() => {
    inputAnimation();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const submitNote = async e => {
    e.preventDefault();
    const { title, text } = e.target.elements;
    const error = document.querySelector(".error");
    if (title.value === "" || text.value === "") {
      error.style.opacity = "1";
      error.style.visibility = "visible";
      error.innerHTML = "Seems like something's missing";
      return;
    }
    error.style.opacity = "0";
    error.style.visibility = "hidden";
    setIsLoading(true);
    await dispatch({
      type: "ADD_NOTE",
      payload: { title: title.value, text: text.value, groupId }
    });
    setIsLoading(false);
    document.getElementById("titleNote").value = "";
    document.getElementById("textNote").value = "";
    hideNewNote();
  };

  const hideNewNote = () => {
    const newNote = document.querySelector(".newNote");
    const modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
    newNote.style.visibility = "hidden";
    newNote.style.opacity = "0";
    newNote.style.transform = "translateX(-50%) scale(0.8)";
  };

  return (
    <div className="newNote" id="newNote">
      <div onClick={hideNewNote} className="bar"></div>
      <form onSubmit={submitNote} className="pretty">
        <h4>New Note</h4>
        <div className="form-group">
          <label htmlFor="titleNote">Title</label>
          <input
            required
            type="text"
            id="titleNote"
            name="title"
            className="form-control input-animated"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="textNote">Type something here...</label>
          <textarea
            required
            type="text"
            id="textNote"
            name="text"
            className="form-control textarea-animated"
            autoComplete="off"
            rows="5"
            cols="60"
            maxLength="200"
          />
        </div>
        <button className="btn btn-block btn-primary">
          {isLoading ? (
            <div>
              Loading... <span className="loading"></span>
            </div>
          ) : (
            <div>Save</div>
          )}
        </button>
        <div className="error"></div>
      </form>
    </div>
  );
};

export default NewNote;
