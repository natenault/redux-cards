import * as types from './types';

export const resetGame = (cardsIds, collectionId) => {
  return {
    type: types.GAME_TOGGLE_RESET,
    collectionId,
    cardsIds
  };
};

export const shuffleCards = cardsIds => {
  return {
    type: types.GAME_SHUFFLE_CARDS,
    cardsIds
  };
};

export const toggleHint = () => {
  return {
    type: types.CARD_TOGGLE_HINT
  };
};

export const flipCard = () => {
  return {
    type: types.CARD_FLIP_SIDE
  };
};

export const setCardIndex = index => {
  return {
    type: types.CARD_CHANGE_INDEX,
    index
  };
};
