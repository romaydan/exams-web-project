import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="query">Respondent's name:</label>

      <input
        name="query"
        id="query"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="form-control"
      />
    </div>
  );
};

export default SearchBox;
