import React, { useState } from "react";
import { rows } from "../admin/UsersDetails";

export let resultSet;
const SearchBar = () => {
  //const [keyword, setKeyword] = useState([]);
  const [resultSet, setResultSet] = useState([]);
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
  };
  // props.targetArray = rows.filter((t) => t.includes(keyword)); // ADDED
  //resultSet = props.filter((t) => t.includes(keyword));
  const handleChanges = (e) => {
    setResultSet(rows.filter((t) => t.includes(e.target.value)));
  };
  return (
    <input
      style={BarStyling}
      key="random1"
      //value={keyword}
      placeholder="Search"
      onChange={handleChanges()}
    />
  );
};

export default SearchBar;
