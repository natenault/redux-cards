import React from 'react';

const Textarea = ({ input, type, label, meta: { touched, error } }) => {
  const formGroupClass = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={formGroupClass}>
      <label>{label}</label>
      <textarea className="form-control" rows="8" {...input} />
      {touched && error && <div className="text-help">{error}</div>}
    </div>
  );
};

export default Textarea;
