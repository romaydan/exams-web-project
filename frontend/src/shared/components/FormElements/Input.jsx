import React from 'react';
import PropTypes from 'prop-types';
const Input = (props) => {
  let element = null;
  switch (props.inputType) {
    case 'text':
    case 'email':
      element = (
        <input
          id={props.inputId}
          name={props.inputId}
          type='text'
          placeholder={props.placeholder}
          value={props.inputValue}
          onChange={props.changed}
          ref={props.refHandler}
        />
      );
      break;
    case 'select':
      const options = Object.keys(props.options).map((key) => (
        <option key={key} value={props.options[key]}>
          {key}
        </option>
      ));
      element = (
        <select
          type={props.inputType}
          id={props.inputId}
          ref={props.refHandler}
          name={props.inputId}
          placeholder={props.placeholder}
          value={props.inputValue}
          onChange={props.changed}
        >
          {options}
        </select>
      );
      break;
    case 'textarea':
      element = (
        <textarea
          id={props.inputId}
          name={props.inputId}
          ref={props.refHandler}
          rows={props.rows || 3}
          value={props.inputValue}
          onChange={props.changed}
        ></textarea>
      );
      break;
    case 'number':
      element = (
        <input
          name={props.inputId}
          id={props.inputId}
          type='number'
          ref={props.refHandler}
          min={props.min}
          max={props.max}
          value={props.inputValue}
          onChange={props.changed}
        />
      );
      break;
    case 'checkbox':
      element = (
        <input
          name={props.inputId}
          ref={props.refHandler}
          type='checkbox'
          value={props.inputValue}
          onChange={props.changed}
        />
      );
      break;
    default:
      break;
  }
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.string,
};

export default Input;
