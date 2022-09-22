import React from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../../../../features/projects/projectsSlice";

const Search = ({ match }) => {
  const dispatch = useDispatch();
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    dispatch(setSearch(value));
  };

  const handleSearch = debounceHandler(doSearch, 500);

  return (
    match && (
      <input
        className="  flex border border-blue-500 rounded-md py-1 px-2 placeholder:text-sm bg-transparent placeholder:text-blue-500 text-blue-500 outline-none focus:ring-2"
        size="sm"
        variant="outlined"
        type="search"
        placeholder="Search for projects..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    )
  );
};

export default Search;
