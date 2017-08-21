import * as types from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case types.AUTH_USER:
      let { userId, email, username, collections } = action.payload.sub;
      return {
        ...state,
        authenticated: true,
        collections,
        email,
        error: '',
        userId,
        username
      };
    case types.UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        collections: [],
        email: '',
        error: '',
        userId: '',
        username: ''
      };
    case types.AUTH_ERROR:
      return { ...state, error: action.payload };
    case types.DELETE_COLLECTION_SUCCESS:
      return { ...state, collections: [...state.collections.filter(id => id !== action.collectionId)] };
    default:
      return state;
  }
}
