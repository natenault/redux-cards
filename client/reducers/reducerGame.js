import { combineReducers } from 'redux';
import * as types from '../actions/types';

const cardsIds = (state = [], action) => {
  switch (action.type) {
    case types.GAME_SHUFFLE_CARDS:
    case types.GAME_TOGGLE_RESET:
      return action.cardsIds;
    default:
      return state;
  }
};

const gameCollectionId = (state = null, action) => {
  switch (action.type) {
    case types.GAME_TOGGLE_RESET:
      return action.collectionId;
    default:
      return state;
  }
};

const currentIndex = (state = 0, action) => {
  switch (action.type) {
    case types.CARD_CHANGE_INDEX:
      return action.index;
    case types.GAME_SHUFFLE_CARDS:
    case types.GAME_TOGGLE_RESET:
      return 0;
    default:
      return state;
  }
};

const showHint = (state = false, action) => {
  switch (action.type) {
    case types.CARD_TOGGLE_HINT:
      return !state;
    case types.GAME_TOGGLE_RESET:
    case types.CARD_CHANGE_INDEX:
      return false;
    default:
      return state;
  }
};

const visibleSide = (state = 'question', action) => {
  switch (action.type) {
    case types.CARD_FLIP_SIDE:
      return state === 'question' ? 'answer' : 'question';
    case types.GAME_TOGGLE_RESET:
    case types.CARD_CHANGE_INDEX:
      return 'question';
    default:
      return state;
  }
};

export default combineReducers({
  cardsIds,
  gameCollectionId,
  currentIndex,
  showHint,
  visibleSide
});
