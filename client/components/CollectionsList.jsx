import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCollections } from '../actions/actionsCollection';
import CollectionsListItem from './CollectionsListItem';

class CollectionsList extends Component {
  componentDidMount() {
    const { allCollectionIds, fetchCollections, currentUser } = this.props;
    if (allCollectionIds.length !== currentUser.collections.length) {
      fetchCollections(currentUser.userId);
    }
  }

  render() {
    const { allCollectionIds, collectionsById } = this.props;
    if (!collectionsById) {
      return <div>Loading...</div>;
    }

    return (
      <article>
        <div className="page-header">
          <div className="row">
            <div className="col-sm-8">
              <h1>Collections List</h1>
            </div>
            <div className="col-sm-4">
              <Link className="btn btn-primary" to="/collections/add">Add Collection</Link>
            </div>
          </div>
          <hr />
        </div>
        <div className="entry-content">
          {allCollectionIds.map(id => {
            return <CollectionsListItem key={id} collection={collectionsById[id]} />;
          })}
        </div>
      </article>
    );
  }
}

const mapStateToProps = ({ currentUser, collections }) => {
  const allCollectionIds = collections.allIds;
  const collectionsById = collections.byId;
  return {
    currentUser,
    allCollectionIds,
    collectionsById
  };
};

export default connect(mapStateToProps, { fetchCollections })(CollectionsList);
