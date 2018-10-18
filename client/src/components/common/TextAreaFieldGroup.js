import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


//Will define the basic format for user input fields
const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
    return (
        <div className="form-group">
            <textarea className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange} />
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    errror: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default TextAreaFieldGroup;