import React from 'react';

const InputText = ({ input, type, label, meta: { touched, error } }) => {
  const formGroupClass = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={formGroupClass}>
      <label>{label}</label>
      <input className="form-control" type={type} placeholder={label} {...input} />
      {touched && error && <div className="text-help">{error}</div>}
    </div>
  );
};

export default InputText;
