import React from "react";

const Filters = ({ filterNotes, isLoading }) => {
  return (
    <div className="filters" id="filters">
      <button
        onClick={() => {
          filterNotes("all");
        }}
        className=" active"
        disabled={isLoading}
        name="all"
      >
        All
      </button>
      <button
        onClick={() => {
          filterNotes("completed");
        }}
        name="completed"
        className=""
        disabled={isLoading}
      >
        Completed
      </button>
      <button
        onClick={() => {
          filterNotes("uncompleted");
        }}
        name="uncompleted"
        className=""
        disabled={isLoading}
      >
        Uncompleted
      </button>
    </div>
  );
};

export default Filters;
