import React from 'react';

const SearchBar = (props) => {
  return (
    <>
      <div className='form-outline'>
        <input
          placeholder={props.label}
          id='search-input'
          type='search'
          onChange={(e) => props.changed(e.target.value)}
          className='form-control'
        />
      </div>
    </>
  );
};

export default SearchBar;
