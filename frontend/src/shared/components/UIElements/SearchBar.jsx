import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input type='search' onChange={(e) => props.changed(e.target.value)} />
    </div>
  );
};

export default SearchBar;
