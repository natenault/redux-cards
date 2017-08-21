import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleHint, flipCard, setCardIndex, resetGame, shuffleCards } from '../actions/actionsGame';
import CollectionGameCard from './CollectionGameCard';
import shuffle from 'lodash/shuffle';

class CollectionGame extends Component {
  componentDidMount() {
    const { cardsIds, collection, gameCollectionId, resetGame } = this.props;
    if (!cardsIds.length || gameCollectionId !== collection.id) {
      resetGame(collection.Cards, collection.id);
    }
  }

  getPrevCard = () => {
    const { cardsIds, currentIndex, setCardIndex } = this.props;
    const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    setCardIndex(newIndex);
  };

  getNextCard = () => {
    const { cardsIds, currentIndex, setCardIndex } = this.props;
    const newIndex = currentIndex === cardsIds.length ? cardsIds.length : currentIndex + 1;
    setCardIndex(newIndex);
  };

  handleShuffleCards = () => {
    const { cardsIds, shuffleCards } = this.props;
    shuffleCards(shuffle(cardsIds));
  };

  handleResetGame = () => {
    const { cardsIds, resetGame } = this.props;
    resetGame(shuffle(cardsIds));
  };

  render() {
    const { cardsIds } = this.props;
    const cardsIdsLength = cardsIds.length;
    if (!cardsIdsLength) {
      return <div>Loading...</div>;
    }

    const { currentIndex, currentCard, collectionId, toggleHint, flipCard, visibleSide, showHint } = this.props;
    return (
      <div className="card-slider">
        <div className="row card-nav mb-3 text-right">
          <div className="btn-group col-sm-8">
            <button
              type="button"
              onClick={() => this.getPrevCard()}
              className="btn btn-primary"
              disabled={currentIndex === 0}
            >
              Prev Card
            </button>
            <button
              type="button"
              onClick={() => this.getNextCard()}
              className="btn btn-primary"
              disabled={currentIndex === cardsIdsLength}
            >
              Next Card
            </button>
          </div>
          <div className="card-count col-sm-4">
            {`${currentIndex === cardsIdsLength ? currentIndex : currentIndex + 1} of ${cardsIdsLength}`}
          </div>
        </div>
        <div className="card-window">
          {currentIndex === cardsIdsLength
            ? <div className="card text-center">
                <div className="card-header">
                  <h2>End</h2>
                </div>
                <div className="card-body">
                  <div className="btn-group">
                    <button onClick={() => this.handleShuffleCards()} type="button" className="btn btn-success">
                      Shuffle Cards
                    </button>
                    <Link to={`/collections/${collectionId}`} className="btn btn-primary">Back To Collection</Link>
                  </div>
                </div>
              </div>
            : <CollectionGameCard
                card={currentCard}
                toggleHint={toggleHint}
                flipCard={flipCard}
                visibleSide={visibleSide}
                showHint={showHint}
              />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cards, collections, game }, { match }) => {
  const { showHint, visibleSide, cardsIds, currentIndex, gameCollectionId } = game;
  const { path, params: { collectionId } } = match;
  const collection = collections.byId[collectionId];
  const currentCardId = cardsIds[currentIndex];
  const currentCard = cards.byId[currentCardId];
  return {
    currentCard,
    currentIndex,
    collectionId,
    collection,
    cardsIds,
    gameCollectionId,
    showHint,
    visibleSide
  };
};

export default connect(mapStateToProps, { toggleHint, flipCard, setCardIndex, resetGame, shuffleCards })(
  CollectionGame
);
