import {LOGIN_SUCCESS} from './types';

export const login =
  ({password, username}) =>
  dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        password,
        username,
      },
    });
  };
