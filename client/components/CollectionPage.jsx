import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { fetchCollection, deleteCollection, updateCollection } from '../actions/actionsCollection';
import { createCards, fetchCards, updateCard } from '../actions/actionsCard';
import CardsList from './CardsList';
import CollectionEdit from './CollectionEdit';
import CollectionHeader from './CollectionHeader';
import CollectionGame from './CollectionGame';

class CollectionPage extends Component {
  componentDidMount() {
    const { collectionId, collection, fetchCollection, fetchCards, isLoaded } = this.props;
    if (!collection) {
      fetchCollection(collectionId);
    }

    if (collection && !isLoaded) {
      fetchCards(collectionId);
    }
  }

  handleCollectionDelete = collectionId => {
    const { collection, deleteCollection, history } = this.props;
    const collectionCardIds = collection.Cards;
    deleteCollection(collectionId, collectionCardIds, () => {
      history.push('/collections');
    });
  };

  render() {
    const { collection, isLoaded } = this.props;

    if (!collection || !isLoaded) {
      return <div>Loading...</div>;
    }

    const { cards, currentUser, collectionId, isReviewing, history, path, url } = this.props;
    const collectionCards = collection.Cards.map(id => cards.byId[id]);
    return (
      <article>
        <CollectionHeader
          collection={collection}
          isReviewing={isReviewing}
          url={url}
          handleCollectionDelete={this.handleCollectionDelete}
        />
        <hr />
        <div className="entry-content">
          <Switch>
            <Route exact path={path} render={props => <CardsList {...props} />} />
            <Route path={`${path}/edit`} render={props => <CollectionEdit {...props} />} />
            <Route path={`${path}/cards`} component={CollectionGame} />
          </Switch>
        </div>
      </article>
    );
  }
}

const mapStateToProps = ({ currentUser, collections, cards }, { match, history, location }) => {
  const { path, url, params: { collectionId } } = match;
  const { pathname } = location;
  const collection = collections.byId[collectionId];
  const isLoaded = collection ? collection.Cards.every(id => cards.allIds.indexOf(id) !== -1) : false;
  const isReviewing = pathname.slice(pathname.lastIndexOf('/') + 1) === 'cards';
  return {
    cards,
    collection,
    collectionId,
    currentUser,
    history,
    isLoaded,
    isReviewing,
    path,
    url
  };
};

export default connect(mapStateToProps, {
  deleteCollection,
  fetchCollection,
  updateCollection,
  createCards,
  fetchCards,
  updateCard
})(CollectionPage);
