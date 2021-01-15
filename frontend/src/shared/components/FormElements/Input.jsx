import React from 'react'
import PropTypes from 'prop-types'

const Input = props => {
    let element = null;
    switch (props.inputType) {
        case 'text':
            element = (
                <input
                id={props.id}
                 type="text"
                    placeholder={props.placeholder}
                    value={props.inputValue}
                    onChange={props.changed}
                />)
            break;
        case 'select': 
        console.log('props :>> ', props);
         const  options=  Object.keys(props.options).map(key => (
                  <option key={key} value={props.options[key]}>{key}</option>
            ))
            element = (
                <select 
                type="text"
                id={props.id}
                    placeholder={props.placeholder}
                    value={props.inputValue}
                    onChange={props.changed}
                >
                    {options}
                </select>)
                break;
        case 'textarea':
            element = (
                <textarea 
                id={props.id}
                rows={props.rows || 3 } 
                value={props.inputValue}
                onChange={props.changed} ></textarea>
            )
            break;
        case 'number':
             element=<input type="number" 
                min={props.min}
                max={props.max}
                value={props.inputValue}
                onChange={props.changed}
                />
            break;
            case 'checkbox':
                element=<input type='checkbox' 
                value={props.inputValue}
                onChange={props.changed}
                
                />
                break;
        default:
            break;
    }
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
        {element}
        </div>
    )
}

Input.propTypes = {
    inputType: PropTypes.string
}

export default Input
