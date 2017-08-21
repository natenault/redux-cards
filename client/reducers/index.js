import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUser from './reducerUser';

const rootReducer = combineReducers({
  currentUser,
  form: formReducer
});

export default rootReducer;
