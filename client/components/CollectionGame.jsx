import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleHint, flipCard, setCardIndex, resetGame } from '../actions/actionsGame';
import CollectionGameCard from './CollectionGameCard';
import shuffle from 'lodash/shuffle';

class CollectionGame extends Component {
  componentDidMount() {
    const { cardsIds, collection, resetGame } = this.props;
    if (!cardsIds.length) {
      resetGame(collection.Cards);
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

  handleResetGame = () => {
    const { cardsIds, resetGame } = this.props;
    resetGame(shuffle(cardsIds));
  };

  render() {
    const { cardsIds } = this.props;
    if (!cardsIds.length) {
      return <div>Loading...</div>;
    }

    const { currentIndex, currentCard, collectionId, toggleHint, flipCard, visibleSide, showHint } = this.props;
    return (
      <div className="card-slider">
        <div className="card-nav mb-3">
          <div className="btn-group">
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
              disabled={currentIndex === cardsIds.length}
            >
              Next Card
            </button>
          </div>
        </div>
        <div className="card-window">
          {currentIndex === cardsIds.length
            ? <div className="card text-center">
                <div className="card-header">End</div>
                <div className="card-body">
                  <div className="btn-group">
                    <button onClick={() => this.handleResetGame()} type="button" className="btn btn-success">
                      Shuffle Cards
                    </button>
                    <Link to={`/collections/${collectionId}`} className="btn btn-primary">Back To Deck</Link>
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
  const { showHint, visibleSide, cardsIds, currentIndex } = game;
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
    showHint,
    visibleSide
  };
};

export default connect(mapStateToProps, { toggleHint, flipCard, setCardIndex, resetGame })(CollectionGame);
