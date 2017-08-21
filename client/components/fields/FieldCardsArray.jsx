import React from 'react';
import { Field, FieldArray } from 'redux-form';
import InputText from './InputText';

const FieldCardsArray = ({ fields, meta }) => {
  const { error, submitFailed } = meta;
  return (
    <section>
      <button className="btn btn-primary" type="button" onClick={() => fields.unshift({})}>Add Card</button>
      {fields.map((card, index, fields) =>
        <fieldset key={index}>
          <legend>Card #{fields.length}</legend>
          <button className="btn btn-danger" type="button" onClick={() => fields.remove(index)}>Remove</button>
          <Field name={`${card}.question`} type="text" component={InputText} label="Question" />
          <Field name={`${card}.answer`} type="text" component={InputText} label="Answer" />
          <Field name={`${card}.hint`} type="text" component={InputText} label="Hint" />
        </fieldset>
      )}
      {submitFailed && error && <div className="text-help">{error}</div>}
    </section>
  );
};

export default FieldCardsArray;
