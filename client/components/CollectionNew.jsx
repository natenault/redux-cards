import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createCollection } from '../actions/actionsCollection';
import CollectionForm from './forms/CollectionForm';

class CollectionsAdd extends Component {
  handleFormSubmit = values => {
    const { createCollection, history, userId } = this.props;
    createCollection(values, userId, () => {
      history.push('/collections');
    });
  };

  render() {
    return (
      <article>
        <div className="entry-header">
          <h1>New Collection</h1>
        </div>
        <div className="entry-content">
          <CollectionForm form="collectionAddForm" handleFormSubmit={this.handleFormSubmit} cancelLink="/collections" />
        </div>
      </article>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { userId: currentUser.userId };
};

export default connect(mapStateToProps, { createCollection })(CollectionsAdd);
