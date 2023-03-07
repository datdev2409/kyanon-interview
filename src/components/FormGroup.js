import React from 'react';
import clsx from 'clsx';

function FormGroup({ label, name, type, placeholder, error }) {
  const inputClasses = "form-input " + (error ? "form-input--error" : "")

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        placeholder={placeholder ?? ''}
        className={inputClasses}
        // className="form-input"
        name={name}
        id={name}
        type={type ?? 'text'}
      />
      {error && <span className='form-error'>{error}</span>}
    </div>
  );
}

export default FormGroup;
