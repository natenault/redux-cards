import React from 'react';
import { Link } from 'react-router-dom';

const CollectionListItem = ({ collection }) => {
  const { id, name, description } = collection;
  return (
    <div key={id} className="card mb-3">
      <h3 className="card-header">{name}</h3>
      <div className="card-body">
        <p className="card-title">{description}</p>
        <div className="btn-group">
          <Link to={`/collections/${id}`} className="btn btn-primary">View Collection</Link>
          <Link to={`/collections/${id}/cards`} className="btn btn-success">Start Reviewing!</Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionListItem;
