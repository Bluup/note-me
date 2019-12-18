import React from "react";
const Note = ({ note, handleSingleNote, uid, currentEmail, groupId }) => {
  const style = {
    color: note.completed ? "rgba(240,240,240,0.4)" : null,
    width: groupId ? "auto" : null,
    maxWidth: groupId ? "80%" : null,
    float: groupId ? (uid === note.by.uid ? "right" : "left") : null,
    clear: groupId ? (uid === note.by.uid ? "both" : "both") : null,
    background: groupId
      ? uid === note.by.uid && !note.completed
        ? "#fcf4e0"
        : null
      : null
  };
  const headerStyle = {
    color: note.completed ? "rgba(210,210,210,1)" : null
  };
  return (
    <div
      onClick={() => {
        handleSingleNote(note.id);
      }}
      className="note"
      style={style}
      note-id={note.id}
    >
      <div className="backdrop"></div>
      {/* {currentEmail !== note.by.email ? (
        <div className="by">{note.by.email}</div>
      ) : null} */}
      <h4 style={headerStyle}>{note.title}</h4>
      <pre>{note.text}</pre>
    </div>
  );
};

export default React.memo(Note);
