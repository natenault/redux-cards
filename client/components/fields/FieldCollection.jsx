import React from 'react';
import { Field } from 'redux-form';
import InputText from '../fields/InputText';
import Textarea from '../fields/Textarea';

const FieldCollection = props => {
  return (
    <fieldset>
      <legend>Collection</legend>
      <Field label="Name" name="name" type="text" component={InputText} />
      <Field label="Description" name="description" component={Textarea} />
    </fieldset>
  );
};

export default FieldCollection;
