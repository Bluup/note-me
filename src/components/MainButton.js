import React from "react";
import authentication from "../auth";
const MainButton = props => {
  const showMenu = () => {
    const mainButton = document.getElementById("mainButton-main");
    const addButton = document.querySelector("[name='addButton']");
    const shareButton = document.querySelector("[name='shareButton']");
    const quitButton = document.querySelector("[name='quit']");

    const bar1 = document.querySelector("[name='bars-1']");
    const bar2 = document.querySelector("[name='bars-2']");
    const bar3 = document.querySelector("[name='bars-3']");

    if (mainButton.getAttribute("dropped") === "false") {
      mainButton.setAttribute("dropped", "true");
      addButton.style.transform = "translateY(0)";
      addButton.style.visibility = "visible";
      addButton.style.opacity = "1";
      shareButton.style.transform = "translateY(0)";
      shareButton.style.visibility = "visible";
      shareButton.style.opacity = "1";
      quitButton.style.transform = "translateY(0)";
      quitButton.style.visibility = "visible";
      quitButton.style.opacity = "1";

      bar2.style.transform = "rotate(135deg)";
      bar1.style.transform = "rotate(45deg) translate(4px,4px)";
      bar3.style.opacity = "0";
    } else {
      mainButton.setAttribute("dropped", "false");
      addButton.style.transform = "translateY(50px)";
      addButton.style.visibility = "hidden";
      addButton.style.opacity = "0";
      shareButton.style.transform = "translateY(50px)";
      shareButton.style.visibility = "hidden";
      shareButton.style.opacity = "0";
      quitButton.style.transform = "translateY(50px)";
      quitButton.style.visibility = "hidden";
      quitButton.style.opacity = "0";

      bar2.style.transform = "rotate(0deg)";
      bar1.style.transform = "rotate(0deg) translate(0px,0px)";
      bar3.style.opacity = "1";
    }
  };

  const displayNewNote = () => {
    const newNote = document.querySelector(".newNote");
    const modal = document.querySelector(".modal");
    modal.style.opacity = "1";
    modal.style.visibility = "visible";

    newNote.style.opacity = "1";
    newNote.style.visibility = "visible";
    newNote.style.transform = "translateX(-50%) scale(1)";

    modal.addEventListener("click", () => {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
      newNote.style.visibility = "hidden";
      newNote.style.opacity = "0";
      newNote.style.transform = "translateX(-50%) scale(0.8)";
    });

    const mainButton = document.getElementById("mainButton-main");
    const addButton = document.querySelector("[name='addButton']");
    const shareButton = document.querySelector("[name='shareButton']");
    const quitButton = document.querySelector("[name='quit']");

    const bar1 = document.querySelector("[name='bars-1']");
    const bar2 = document.querySelector("[name='bars-2']");
    const bar3 = document.querySelector("[name='bars-3']");

    mainButton.setAttribute("dropped", "false");
    addButton.style.transform = "translateY(50px)";
    addButton.style.visibility = "hidden";
    addButton.style.opacity = "0";
    shareButton.style.transform = "translateY(50px)";
    shareButton.style.visibility = "hidden";
    shareButton.style.opacity = "0";
    quitButton.style.transform = "translateY(50px)";
    quitButton.style.visibility = "hidden";
    quitButton.style.opacity = "0";
    bar2.style.transform = "rotate(0deg)";
    bar1.style.transform = "rotate(0deg) translate(0px,0px)";
    bar3.style.opacity = "1";
  };

  const displayShared = () => {
    const shared = document.querySelector(".shared");
    const bar = shared.querySelector(".bar");

    shared.style.opacity = "1";
    shared.style.visibility = "visible";
    shared.style.transform = "scale(1)";

    bar.addEventListener("click", () => {
      shared.style.visibility = "hidden";
      shared.style.opacity = "0";
      shared.style.transform = "scale(0.9)";
    });

    const mainButton = document.getElementById("mainButton-main");
    const addButton = document.querySelector("[name='addButton']");
    const shareButton = document.querySelector("[name='shareButton']");
    const quitButton = document.querySelector("[name='quit']");

    const bar1 = document.querySelector("[name='bars-1']");
    const bar2 = document.querySelector("[name='bars-2']");
    const bar3 = document.querySelector("[name='bars-3']");

    mainButton.setAttribute("dropped", "false");
    addButton.style.transform = "translateY(50px)";
    addButton.style.visibility = "hidden";
    addButton.style.opacity = "0";
    shareButton.style.transform = "translateY(50px)";
    shareButton.style.visibility = "hidden";
    shareButton.style.opacity = "0";
    quitButton.style.transform = "translateY(50px)";
    quitButton.style.visibility = "hidden";
    quitButton.style.opacity = "0";
    bar2.style.transform = "rotate(0deg)";
    bar1.style.transform = "rotate(0deg) translate(0px,0px)";
    bar3.style.opacity = "1";
  };

  const logout = () => {
    authentication.logout();
    window.location.href = "/";
  };
  return (
    <div className="" id="mainButton">
      <button name="quit" onClick={logout} className="btn dropButton">
        <i className="fas fa-sign-out-alt"></i>
      </button>
      <button
        name="shareButton"
        onClick={displayShared}
        className="btn dropButton"
      >
        <i className="fas fa-share-alt"></i>
      </button>
      <button
        onClick={displayNewNote}
        name="addButton"
        className="btn dropButton"
      >
        <i className="fas fa-plus"></i>
      </button>
      <button
        className="btn"
        onClick={showMenu}
        dropped="false"
        id="mainButton-main"
      >
        <div name="bars-1" className="bars"></div>
        <div name="bars-2" className="bars"></div>
        <div name="bars-3" className="bars"></div>
      </button>
    </div>
  );
};

export default MainButton;
