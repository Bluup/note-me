import React from "react";
const Note = ({ note, handleSingleNote }) => {
  const style = {
    color: note.completed ? "rgba(240,240,240,0.4)" : null
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
      <h4 style={headerStyle}>{note.title}</h4>
      <p>{note.text}</p>
    </div>
  );
};

export default React.memo(Note);
