import React, { useState } from "react";

const SearchBar = ({ search }) => {
  const [value, setValue] = useState("");
  let timer = "";
  const changeValue = e => {
    clearTimeout(timer);
    const value = e.target.value;
    setValue(value);
    search(value);
  };
  return (
    <div className="" id="searchBar">
      <input
        onChange={changeValue}
        value={value}
        type="text"
        id="searchBar-input"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
