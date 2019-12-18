import React, { useContext } from "react";
import moment from "moment";
import UserContext from "../UserContext";
import GroupContext from "../GroupContext";
import authentication from "../auth";

const SingleNote = ({ note, displayDeleteMessage }) => {
  const Context = useContext(UserContext);
  const groupId = useContext(GroupContext);
  const style = {
    color:
      note !== null ? (note.completed ? "rgba(210,210,210,1)" : null) : null
  };
  const headerStyle = {
    color:
      note !== null ? (note.completed ? "rgba(210,210,210,1)" : null) : null
  };
  const hideNote = () => {
    setTimeout(() => {
      const singleNote = document.getElementById("singleNote");
      const singleNoteContainer = document.querySelector(".upperSingleNote");
      const deleteMessage = document.querySelector(".checkSetp");
      deleteMessage.style.visibility = "hidden";
      deleteMessage.style.opacity = "0";
      deleteMessage.style.transform = "translateY(20px)";
      singleNote.style.visibility = "hidden";
      singleNote.style.opacity = "0";
      singleNote.style.transform = "scale(0.8)";
      singleNoteContainer.style.visibility = "hidden";
      singleNoteContainer.style.opacity = "0";
      singleNoteContainer.style.zIndex = "-100";
      const modal = document.querySelector(".modal");
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }, 50);
    cancelEdit();
  };

  const hideDeleteMessage = () => {
    const deleteMessage = document.querySelector(".checkSetp");
    deleteMessage.style.visibility = "hidden";
    deleteMessage.style.opacity = "0";
    deleteMessage.style.transform = "translateY(20px)";
  };

  const makeEditable = () => {
    const singleNote = document.getElementById("singleNote");
    const titleValue = singleNote.querySelector("h4").innerHTML;
    const textValue = singleNote.querySelector("pre").innerHTML;
    const title = singleNote.querySelector("h4");
    const text = singleNote.querySelector("pre");
    const actions = document.querySelector(".actions");
    const hiddenActions = document.querySelector(".hiddenActions");

    title.style.position = "absolute";
    title.style.opacity = "0";
    title.style.visibility = "hidden";
    text.style.position = "absolute";
    text.style.opacity = "0";
    text.style.visibility = "hidden";

    const height = text.offsetHeight;

    const inputTitle = document.createElement("input");
    const inputText = document.createElement("textarea");

    inputTitle.className = "newTitle";

    singleNote.insertBefore(inputTitle, document.querySelector(".footer"));
    singleNote.insertBefore(inputText, document.querySelector(".footer"));

    inputTitle.style.opacity = "0";
    inputTitle.style.visibility = "hidden";
    inputText.style.opacity = "0";
    inputText.style.visibility = "hidden";
    inputText.style.height = height + "px";
    actions.style.transform = "translateY(-10px)";
    actions.style.opacity = "0";
    actions.style.visibility = "hidden";

    hiddenActions.style.transform = "translateY(0px)";
    hiddenActions.style.opacity = "1";
    hiddenActions.style.visibility = "visible";

    inputTitle.style.transition = "all 0.3s ease-in-out";
    inputText.style.transition = "all 0.3s ease-in-out";

    inputTitle.value = titleValue;
    inputText.value = textValue;

    setTimeout(() => {
      inputTitle.style.opacity = "1";
      inputTitle.style.visibility = "visible";
      inputText.style.opacity = "1";
      inputText.style.visibility = "visible";
    }, 10);
  };

  const cancelEdit = () => {
    const singleNote = document.getElementById("singleNote");
    const title = singleNote.querySelector("h4");
    const text = singleNote.querySelector("pre");
    const actions = document.querySelector(".actions");
    const hiddenActions = document.querySelector(".hiddenActions");

    const inputTitle = singleNote.querySelector("input");
    const inputText = singleNote.querySelector("textarea");

    if (inputText === null) return;

    inputTitle.style.opacity = "0";
    inputTitle.style.visibility = "hidden";
    inputText.style.opacity = "0";
    inputText.style.visibility = "hidden";

    singleNote.querySelector("input").remove();
    singleNote.querySelector("textarea").remove();

    actions.style.transform = "translateY(0px)";
    actions.style.opacity = "1";
    actions.style.visibility = "visible";

    hiddenActions.style.transform = "translateY(15px)";
    hiddenActions.style.opacity = "0";
    hiddenActions.style.visibility = "hidden";

    title.style.position = "static";
    title.style.opacity = "1";
    title.style.visibility = "visible";
    text.style.position = "static";
    text.style.opacity = "1";
    text.style.visibility = "visible";
  };

  const editNote = () => {
    const title = document.querySelector(".newTitle").value;
    const text = document.getElementById("singleNote").querySelector("textarea")
      .value;
    cancelEdit();
    Context.dispatch({
      type: "EDIT_NOTE",
      payload: {
        id: note.id,
        title,
        text,
        groupId
      }
    });
  };

  const currentEmail = authentication.getUser();

  let date = "";
  if (note !== null) {
    date = moment(note.date)
      .startOf("day")
      .fromNow();
  }

  return (
    <div className="upperSingleNote">
      <div className="note" id="singleNote">
        {note !== null ? (
          <>
            <div onClick={hideNote} className="bar"></div>
            <p className="by">
              {note.by
                ? note.by.email !== currentEmail
                  ? note.by.email
                  : null
                : null}
            </p>
            <h4 className="selectable" style={headerStyle}>
              {note.title}
            </h4>
            <pre className="selectable" style={style}>
              {note.text}
            </pre>
            <div className="footer">
              <div className="date">{date}</div>
              <div className="actions">
                <label className="labelContainer">
                  <input
                    onChange={() => {
                      Context.dispatch({
                        type: "TOGGLE_COMPLETED",
                        payload: {
                          id: note.id,
                          value: note.completed,
                          groupId
                        }
                      });
                    }}
                    checked={note.completed || false}
                    className="inputCheckbox"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <button
                  onClick={makeEditable}
                  disabled={note.completed}
                  name="edit"
                ></button>
                <button onClick={displayDeleteMessage} name="delete"></button>
              </div>
              <div className="hiddenActions">
                <button name="acceptEdit" onClick={editNote}></button>
                <button onClick={cancelEdit} name="cancelEdit"></button>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="checkSetp">
        {note !== null ? (
          <>
            <div className="barReference">
              <div onClick={hideDeleteMessage} className="bar"></div>
            </div>
            <p>Do you want to delete this note?</p>
            <div className="buttons">
              <button onClick={hideDeleteMessage} name="cancel"></button>
              <button
                name="delete"
                onClick={() => {
                  hideNote();
                  Context.dispatch({
                    type: "DELETE_NOTE",
                    payload: {
                      id: note.id,
                      groupId
                    }
                  });
                }}
              ></button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(SingleNote);
