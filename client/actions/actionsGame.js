import * as types from './types';

export const resetGame = collectionCardsIds => {
  return {
    type: types.GAME_TOGGLE_RESET,
    collectionCardsIds
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
