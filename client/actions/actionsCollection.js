import axios from 'axios';
import { normalize } from 'normalizr';
import * as types from './types';
import * as schema from './schema';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

const ROOT_URL = 'http://localhost:3090';

export const fetchCollections = userId => dispatch => {
  axios
    .get(`${ROOT_URL}/api/user/${userId}/collections`)
    .then(response => {
      console.log(normalize(response.data, schema.arrayOfCollections));
      dispatch({
        type: types.FETCH_COLLECTIONS_SUCCESS,
        response: normalize(response.data, schema.arrayOfCollections)
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchCollection = collectionId => dispatch => {
  axios
    .get(`${ROOT_URL}/api/collections/${collectionId}`)
    .then(response => {
      console.log(normalize(response.data, schema.collection));
      dispatch({
        type: types.FETCH_COLLECTION_SUCCESS,
        response: normalize(response.data, schema.collection)
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const createCollection = (values, userId, callback) => dispatch => {
  axios
    .post(`${ROOT_URL}/api/user/${userId}/collections`, values)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: types.CREATE_COLLECTION_SUCCESS,
        response: normalize(response.data, schema.collection)
      });
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteCollection = (collectionId, collectionCardIds, callback) => dispatch => {
  axios
    .delete(`${ROOT_URL}/api/collections/${collectionId}`)
    .then(response => {
      dispatch({
        type: types.DELETE_COLLECTION_SUCCESS,
        collectionId,
        collectionCardIds
      });
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateCollection = (collection, collectionId, callback) => dispatch => {
  axios
    .put(`${ROOT_URL}/api/collections/${collectionId}`, collection)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: types.UPDATE_COLLECTION_SUCCESS,
        response: response.data
      });
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};
