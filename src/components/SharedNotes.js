/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import { get_notes, get_note, get_groupId } from "../helpers/functions";
import app from "../config/app";
import NavNotes from "./NavNotes";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import MainButton from "./MainButton";
import SingleNote from "./SingleNote";
import Shared from "./Shared";
import GroupContex from "../GroupContext";

const SharedNotes = () => {
  const [state, setState] = useState([]);
  const [originalState, setOriginalState] = useState([]);
  const [loading, setloading] = useState(false);
  const [note, setNote] = useState({});
  const [groupId, setGroupId] = useState("");
  const [userUid, setUserUid] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  document.documentElement.style.setProperty("--maincolor", "#edc056");
  useEffect(() => {
    document.getElementById("mynotes-link").className = "";
    document.getElementById("shared-link").className = "active right-active";
    setloading(true);
    app.auth().onAuthStateChanged(user => {
      if (user) {
        get_groupId(user.uid, groupId => {
          get_notes(user.uid, true, groupId, notes => {
            setState(notes);
            setOriginalState(notes);
            setGroupId(groupId);
            setUserUid(user.uid);
            setCurrentEmail(user.email);
          });
        });
      }
      setTimeout(() => {
        setloading(false);
      }, 1000);
    });
  }, []);

  const handleSingleNote = noteId => {
    const singleNote = document.getElementById("singleNote");
    const modal = document.querySelector(".modal");
    const deleteMessage = document.querySelector(".checkSetp");
    const singleNoteContainer = document.querySelector(".upperSingleNote");
    app.auth().onAuthStateChanged(user => {
      if (user) {
        get_note(user.uid, noteId, groupId, note => {
          setNote(note);
          modal.style.visibility = "visible";
          modal.style.opacity = "1";
          singleNoteContainer.addEventListener("click", e => {
            if (e.target.classList[0] !== "upperSingleNote") return;
            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
            deleteMessage.style.visibility = "hidden";
            deleteMessage.style.opacity = "0";
            deleteMessage.style.transform = "translateY(20px)";
            singleNoteContainer.style.visibility = "hidden";
            singleNoteContainer.style.opacity = "0";
            singleNoteContainer.style.zIndex = "-100";
            singleNote.style.visibility = "hidden";
            singleNote.style.opacity = "0";
            singleNote.style.transform = "scale(0.8)";

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
          });
          singleNoteContainer.style.zIndex = "200";
          singleNoteContainer.style.visibility = "visible";
          singleNoteContainer.style.opacity = "1";
          singleNote.style.visibility = "visible";
          singleNote.style.opacity = "1";
          singleNote.style.transform = "scale(1)";
        });
      }
    });
  };

  const searchQuery = query => {
    let newList = [];
    let currentList = [];

    if (query != "") {
      currentList = originalState;
      newList = currentList.filter(note => {
        const lc = note.title.toLowerCase();
        const description = note.text.toLowerCase();
        const filter = query.toLowerCase();
        return lc.includes(filter) || description.includes(filter);
      });
    } else {
      newList = originalState;
    }
    setState(newList);
    return;
  };

  const displayDeleteMessage = () => {
    const div = document.querySelector(".checkSetp");
    div.style.transform = "translateY(0)";
    div.style.visibility = "visible";
    div.style.opacity = "1";
  };
  const filterNotes = filter => {
    document
      .getElementById("filters")
      .querySelector(".active")
      .classList.remove("active");
    document
      .getElementById("filters")
      .querySelector("[name='" + filter + "']")
      .classList.add("active");
    if (filter == "all") {
      setState(originalState);
    } else {
      let newState = originalState.filter(note => {
        let noteState = "";
        if (note.completed == true) {
          noteState = "completed";
        } else {
          noteState = "uncompleted";
        }
        return noteState === filter;
      });
      if (newState.length === 0) {
        newState = [{ id: 1, title: "No Data Found", by: { uid: null } }];
      }
      setState(newState);
    }
  };

  return (
    <div className="notes" id="notes">
      <GroupContex.Provider value={groupId}>
        <SingleNote note={note} displayDeleteMessage={displayDeleteMessage} />
        <Shared />
        <NavNotes />
        <NewNote />
        <SearchBar search={searchQuery} />
        <Filters isLoading={loading} filterNotes={filterNotes} />
        <div className="notesContainer">
          {loading ? (
            <div className="fullLoader">
              <div className="loading-primary"></div>
            </div>
          ) : state.length > 0 ? (
            state.map(note => (
              <Note
                currentEmail={currentEmail}
                groupId={groupId}
                uid={userUid}
                handleSingleNote={handleSingleNote}
                key={note.id}
                note={note}
              />
            ))
          ) : (
            <div className="noDataFound">Nothing around here :(</div>
          )}
          <MainButton />
          <div className="modal"></div>
        </div>
      </GroupContex.Provider>
    </div>
  );
};

export default React.memo(SharedNotes);
