import React from 'react';
import { Link } from 'react-router-dom';
import CollectionForm from './forms/CollectionForm';

const CardsListItem = props => {
  const { card, url, handleCardDelete } = props;
  const { id, collectionId, question, answer, hint } = card;
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-md-7">
          <div><strong>Question:</strong> {question}</div>
        </div>
        <div className="col-md-5 card-actions">
          <div className="btn-group">
            <Link className="btn btn-success btn-sm" to={`${url}/edit/${id}`}>Edit Card</Link>
            <button onClick={() => handleCardDelete(id)} className="btn btn-danger btn-sm">Delete Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsListItem;

