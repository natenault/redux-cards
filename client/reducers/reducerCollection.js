import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import * as types from '../actions/types';

const collection = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_CARD_SUCCESS:
      return {
        ...state,
        Cards: state.Cards.filter(id => id !== action.response.cardId)
      };
    case types.CREATE_CARDS_SUCCESS:
      return {
        ...state,
        Cards: [...state.Cards, ...action.response.result]
      };
    case types.UPDATE_COLLECTION_SUCCESS:
      return { ...state, ...action.response };
    default:
      return state;
  }
};

const collectionsById = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_CARD_SUCCESS:
      return {
        ...state,
        [action.response.collectionId]: collection(state[action.response.collectionId], action)
      };
    case types.CREATE_CARDS_SUCCESS:
      return {
        ...state,
        [action.collectionId]: collection(state[action.collectionId], action)
      };
    case types.FETCH_COLLECTION_SUCCESS:
    case types.CREATE_COLLECTION_SUCCESS:
    case types.FETCH_COLLECTIONS_SUCCESS:
      return { ...state, ...action.response.entities.collections };
    case types.UPDATE_COLLECTION_SUCCESS:
      return {
        ...state,
        [action.response.id]: collection(state[action.response.id], action)
      };
    case types.DELETE_COLLECTION_SUCCESS:
      return omit(state, action.collectionId);
    default:
      return state;
  }
};

const allCollections = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_COLLECTION_SUCCESS:
    case types.CREATE_COLLECTION_SUCCESS:
      return [...state, action.response.result];
    case types.FETCH_COLLECTIONS_SUCCESS:
      return action.response.result;
    case types.DELETE_COLLECTION_SUCCESS:
      return state.filter(id => id !== action.collectionId);
    default:
      return state;
  }
};

export default combineReducers({
  byId: collectionsById,
  allIds: allCollections
});
