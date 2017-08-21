import React from 'react';
import { Field } from 'redux-form';
import InputText from '../fields/InputText';

const FieldCard = props => {
  return (
    <fieldset>
      <legend>Card</legend>
      <Field name="question" type="text" component={InputText} label="Question" />
      <Field name="answer" type="text" component={InputText} label="Answer" />
      <Field name="hint" type="text" component={InputText} label="Hint" />
    </fieldset>
  );
};

export default FieldCard;
