import React from "react";

const Search = ({ match }) => {
  return (
    match && (
      <input
        className="  flex border border-blue-500 rounded-md py-1 px-2 placeholder:text-sm bg-transparent placeholder:text-blue-500 text-blue-500 outline-none focus:ring-2"
        size="sm"
        variant="outlined"
        type="search"
        placeholder="Search for projects..."
      />
    )
  );
};

export default Search;
