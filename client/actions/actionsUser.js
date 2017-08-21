import axios from 'axios';
import decode from 'jwt-decode';
import * as types from './types';

const ROOT_URL = 'http://localhost:3090';
const authErrorMessage = 'Incorrect email or password';

export function signupUser({ email, username, password }, callback) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/auth/signup`, { email, username, password })
      .then(response => {
        const payload = decode(response.data.token);
        dispatch({
          type: types.AUTH_USER,
          payload
        });

        localStorage.setItem('token', response.data.token);

        callback();
      })
      .catch(error => {
        if (error.response) {
          dispatch(authError(error.response.data.error));
        }
      });
  };
}

export function signinUser({ email, password }, callback) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/auth/signin`, { email, password })
      .then(response => {
        const payload = decode(response.data.token);
        dispatch({
          type: types.AUTH_USER,
          payload
        });

        localStorage.setItem('token', response.data.token);

        callback();
      })
      .catch(error => {
        if (error.response) {
          dispatch(authError(error.response.data.error));
        }
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: types.UNAUTH_USER
  };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}
