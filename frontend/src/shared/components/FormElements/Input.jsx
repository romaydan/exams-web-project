import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  let element = null;
  switch (props.type) {
    case 'text':
    case 'email':
    case 'checkbox':
    case 'number':
      element = <input ref={props.reference} {...props} />;
      break;
    case 'select':
      const options = Object.keys(props.options).map((key) => (
        <option key={key} value={props.options[key]}>
          {key}
        </option>
      ));
      element = (
        <select ref={props.reference} {...props}>
          {options}
        </select>
      );
      break;
    case 'textarea':
      element = <textarea ref={props.reference} {...props}></textarea>;
      break;

    default:
      break;
  }
  return (
    <div>
      {props.label ? <label>{props.label}</label> : null}
      {element}
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.string,
};

export default Input;
