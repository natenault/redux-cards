import { combineReducers } from 'redux';
import currentUser from './reducerUser';

const rootReducer = combineReducers({
  currentUser
});

export default rootReducer;
