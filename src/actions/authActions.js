import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { SET_CURRENT_USER, SET_LOGIN_ERROR_MESSAGE } from './types';

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => dispatch({
      type: SET_LOGIN_ERROR_MESSAGE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    }));
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
