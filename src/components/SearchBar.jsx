import React from "react";

const SearchBar = ({ value, isLoading, handleSubmit, onChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        disabled={isLoading}
        onChange={onChange}
        placeholder="Search for Recipes"
        className="form-control"
      />
      <input
        type="submit"
        className="btn"
        value="Search"
        disabled={isLoading || !value}
      />
    </form>
  );
};

export default SearchBar;