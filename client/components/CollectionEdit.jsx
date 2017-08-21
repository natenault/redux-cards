import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { updateCollection } from '../actions/actionsCollection';
import { createCards, updateCard } from '../actions/actionsCard';
import CollectionForm from './forms/CollectionForm';

class CollectionEdit extends Component {
  // Handle Collection Update
  handleCollectionUpdate = collectionToUpdate => {
    const { collectionId, updateCollection, history } = this.props;
    updateCollection(collectionToUpdate, collectionId, () => {
      history.push(`/collections/${collectionId}`);
    });
  };

  // Handle Cards Create
  handleCardCreate = ({ cards }) => {
    const { collectionId, createCards, history } = this.props;
    const cardsToCreate = cards.map(card => {
      card.collectionId = collectionId;
      return card;
    });
    createCards(cardsToCreate, collectionId, () => {
      history.push(`/collections/${collectionId}`);
    });
  };

  // Handle Card Update
  handleCardUpdate = card => {
    const { collectionId, updateCard, history } = this.props;
    updateCard(card, () => {
      history.push(`/collections/${collectionId}`);
    });
  };

  render() {
    const { cards, collection, path } = this.props;
    const cancelLink = `/collections/${collection.id}`;
    return (
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={props => {
            return (
              <CollectionForm
                editCollection
                form="collectionEditForm"
                handleFormSubmit={this.handleCollectionUpdate}
                initialValues={{ ...collection }}
                cancel={cancelLink}
                {...props}
              />
            );
          }}
        />
        <Route
          path={`${path}/add`}
          render={props =>
            <CollectionForm
              addCards
              cancel={cancelLink}
              form="cardsAddForm"
              handleFormSubmit={this.handleCardCreate}
              {...props}
            />}
        />
        <Route
          path={`${path}/:cardId`}
          render={props => {
            const { cardId } = props.match.params;
            const card = cards.byId[cardId];
            return (
              <CollectionForm
                editCard
                cancel={cancelLink}
                form="cardEditForm"
                handleFormSubmit={this.handleCardUpdate}
                initialValues={card}
                {...props}
              />
            );
          }}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ collections, cards }, { match, history }) => {
  const { path, params: { collectionId } } = match;
  const collection = collections.byId[collectionId];
  return {
    cards,
    collectionId,
    collection,
    history,
    path
  };
};

export default connect(mapStateToProps, {
  updateCollection,
  createCards,
  updateCard
})(CollectionEdit);
