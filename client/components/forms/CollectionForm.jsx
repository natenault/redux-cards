import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputText from '../fields/InputText';
import Textarea from '../fields/Textarea';
import FieldCollection from '../fields/FieldCollection';
import FieldCardsArray from '../fields/FieldCardsArray';
import FieldCard from '../fields/FieldCard';

const CollectionForm = props => {
  const {
    editCollection,
    addCards,
    editCard,
    cancel = '/collections',
    handleSubmit,
    handleFormSubmit,
    reset,
    pristine,
    submitting
  } = props;
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {editCard && <FieldCard />}
      {editCard || addCards || <FieldCollection />}
      {editCollection || editCard || <FieldArray name="cards" component={FieldCardsArray} />}
      <div className="row">
        <div className="btn-group">
          <button className="btn btn-primary" type="submit" disabled={submitting || pristine}>
            Submit
          </button>
          <Link to={cancel} className="btn btn-warning" disabled={submitting}>
            Cancel
          </Link>
          <button className="btn btn-danger" type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  enableReinitialize: true
})(CollectionForm);
