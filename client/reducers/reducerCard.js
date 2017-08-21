import { combineReducers } from 'redux';
import * as types from '../actions/types';
import omit from 'lodash/omit';

const cardsById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CARDS_SUCCESS:
    case types.CREATE_CARDS_SUCCESS:
      return { ...state, ...action.response.entities.cards };
    case types.UPDATE_CARD_SUCCESS:
      return { ...state, ...action.response.entities.cards };
    case types.DELETE_CARD_SUCCESS:
      return omit(state, action.response.cardId);
    case types.FETCH_COLLECTION_SUCCESS:
    case types.CREATE_COLLECTION_SUCCESS:
      return { ...state, ...action.response.entities.cards };
    case types.DELETE_COLLECTION_SUCCESS:
      return omit(state, action.collectionCardIds);
    default:
      return state;
  }
};

const addCardIds = (state, action) => {
  const { cards } = action.response.entities;
  const cardIds = cards ? Object.keys(cards).map(id => parseInt(id)) : [];
  return [...state, ...cardIds];
};

const allCards = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CARDS_SUCCESS:
    case types.CREATE_CARDS_SUCCESS:
      return [...state, ...action.response.result];
    case types.DELETE_CARD_SUCCESS:
      return state.filter(id => id !== action.response.cardId);
    case types.FETCH_COLLECTION_SUCCESS:
    case types.CREATE_COLLECTION_SUCCESS:
      return addCardIds(state, action);
    case types.DELETE_COLLECTION_SUCCESS:
      return state.filter(id => action.collectionCardIds.indexOf(id) === -1);
    default:
      return state;
  }
};

export default combineReducers({
  byId: cardsById,
  allIds: allCards
});
