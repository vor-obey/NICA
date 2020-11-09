import React from "react";
import PropTypes from 'prop-types'
import './input.css';

export const Input = ({name, type, style}) => {
    return (
        <div className={`input ${style}`}>
            <label htmlFor={name}>{name}</label>
            <input id={name} name={name} type={type}/>
        </div>
    )
}

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email', 'password', 'checkbox']),
    style: PropTypes.string
}