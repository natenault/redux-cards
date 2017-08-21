import React from 'react';
import { Link } from 'react-router-dom';

const CollectionHeader = ({ collection, isReviewing, url, handleCollectionDelete }) => {
  return (
    <div className="page-header">
      <div className="row">
        <div className="col-md-7">
          <h1>{collection.name}</h1>
        </div>
        <div className="col-md-5">
          {isReviewing
            ? <Link className="btn btn-primary" to={url}>Back To Collection</Link>
            : <div className="btn-group btn-group-sm">
                <Link className="btn btn-warning" to={`${url}/edit`}>Edit Collection</Link>
                <Link className="btn btn-primary" to={`${url}/edit/add`}>Add Cards</Link>
                <Link className="btn btn-success" to={`${url}/cards`}>Start Reviewing</Link>
                <button onClick={() => handleCollectionDelete(collection.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>}
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
