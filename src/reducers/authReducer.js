import { isEmpty } from '../utils/helper';

import { SET_CURRENT_USER, SET_LOGIN_ERROR_MESSAGE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  status: {
    loginHasFailed: false,
    errorMessage: '',
    status: '',
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_LOGIN_ERROR_MESSAGE:
      return {
        ...state,
        status: {
          loginHasFailed: true,
          errorMessage: action.payload.message,
          status: action.payload.status,
        },
      };
    default:
      return state;
  }
}
