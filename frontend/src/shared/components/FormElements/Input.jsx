import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  let element = null;
  const newProps = { ...props };
  delete newProps.reference;
  switch (props.type) {
    case 'text':
    case 'email':
    case 'number':
      element = (
        <input ref={props.reference} className='form-control' {...newProps} />
      );
      break;
    case 'select':
      const options = Object.keys(props.options).map((key) => (
        <option key={key} value={props.options[key]}>
          {key}
        </option>
      ));
      element = (
        <select ref={props.reference} className='form-control' {...newProps}>
          {options}
        </select>
      );
      break;
    case 'textarea':
      element = (
        <textarea
          className='form-control'
          ref={props.reference}
          {...newProps}
        ></textarea>
      );
      break;
    case 'checkbox':
      element = (
        <input
          ref={props.reference}
          className='form-check-input'
          {...newProps}
        />
      );
      break;

    default:
      break;
  }
  return (
    <div>
      {props.label && props.type !== 'checkbox' ? (
        <label htmlFor={element.id}>{props.label}</label>
      ) : null}
      {element}
      {props.type === 'checkbox' ? (
        <label htmlFor={element.id} class='form-check-label'>
          {props.label}
        </label>
      ) : null}
      
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.string,
};

export default Input;
