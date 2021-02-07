import React from 'react';
import PropTypes from 'prop-types';
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
SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
};
export default SearchBar;
