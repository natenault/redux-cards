import axios from 'axios';
import { normalize } from 'normalizr';
import * as types from './types';
import * as schema from './schema';

const ROOT_URL = 'http://localhost:3090';

export const fetchCards = collectionId => dispatch => {
  axios
    .get(`${ROOT_URL}/api/cards/${collectionId}`)
    .then(response => {
      dispatch({
        type: types.FETCH_CARDS_SUCCESS,
        response: normalize(response.data, schema.arrayOfCards)
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const createCards = (cards, collectionId, callback) => dispatch => {
  axios
    .post(`${ROOT_URL}/api/cards`, { cards })
    .then(response => {
      dispatch({
        type: types.CREATE_CARDS_SUCCESS,
        response: normalize(response.data, schema.arrayOfCards),
        collectionId
      });
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateCard = (card, callback) => dispatch => {
  axios
    .put(`${ROOT_URL}/api/cards`, { card })
    .then(response => {
      dispatch({
        type: types.UPDATE_CARD_SUCCESS,
        response: normalize(response.data, schema.card)
      });
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteCard = (cardId, collectionId) => dispatch => {
  axios
    .delete(`${ROOT_URL}/api/cards`, { params: { cardId } })
    .then(response => {
      dispatch({
        type: types.DELETE_CARD_SUCCESS,
        response: { cardId, collectionId }
      });
    })
    .catch(err => {
      console.log(err);
    });
};
