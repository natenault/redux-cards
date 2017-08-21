import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { AUTH_USER } from './actions/types';
import reducer from './reducers';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

const token = localStorage.getItem('token');
if (token) {
  const payload = decode(token);
  store.dispatch({ type: AUTH_USER, payload });
}

export default store;
