import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCard } from '../actions/actionsCard';
import CardsListItem from './CardsListItem';

class CardsList extends Component {
  handleCardDelete = cardId => {
    const { collectionId, deleteCard } = this.props;
    deleteCard(cardId, collectionId);
  };

  render() {
    const { collectionCards, url } = this.props;

    if (!collectionCards) {
      return <div>Loading...</div>;
    }

    return (
      <div className="list-group">
        {collectionCards.map(card => {
          return <CardsListItem key={card.id} card={card} url={url} handleCardDelete={this.handleCardDelete} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ cards, collections }, { match }) => {
  const { url, params: { collectionId } } = match;
  const collection = collections.byId[collectionId];
  const collectionCards = collection.Cards.map(id => cards.byId[id]);
  return {
    collectionId,
    collectionCards,
    url
  };
};

export default connect(mapStateToProps, { deleteCard })(CardsList);
