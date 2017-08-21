import { combineReducers } from 'redux';
import * as types from '../actions/types';

const handleChangeCard = (state = 0, action) => {
  switch (action.type) {
    case types.CARD_CHANGE_INDEX:
      return action.index;
    case types.GAME_TOGGLE_RESET:
      return 0;
    default:
      return state;
  }
};

const handleCardsIds = (state = [], action) => {
  switch (action.type) {
    case types.GAME_TOGGLE_RESET:
      return action.collectionCardsIds;
    default:
      return state;
  }
};

const handleFlip = (state = 'question', action) => {
  switch (action.type) {
    case types.CARD_FLIP_SIDE:
      return state === 'question' ? 'answer' : 'question';
    case types.CARD_CHANGE_INDEX:
      return 'question';
    default:
      return state;
  }
};

const showHint = (state = false, action) => {
  switch (action.type) {
    case types.CARD_TOGGLE_HINT:
      return !state;
    case types.CARD_CHANGE_INDEX:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  showHint,
  visibleSide: handleFlip,
  cardsIds: handleCardsIds,
  currentIndex: handleChangeCard
});
