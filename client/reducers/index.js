import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUser from './reducerUser';
import cardReducer, * as fromCards from './reducerCard';
import collectionReducer, * as fromCollections from './reducerCollection';

const rootReducer = combineReducers({
  currentUser,
  cards: cardReducer,
  collections: collectionReducer,
  form: formReducer
});

export default rootReducer;
