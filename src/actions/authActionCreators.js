import AUTH_ACTION_TYPES from './authActionTypes';

export const loginRequest = (data) => ({
  type: AUTH_ACTION_TYPES.LOGIN_REQUEST,
  payload: { data },
});

export const signUpRequest = (data) => ({
  type: AUTH_ACTION_TYPES.SIGN_UP_REQUEST,
  payload: {
    data,
  },
});

export const authRequestFetching = () => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST_FETCHING,
});

export const authRequestSuccess = (data) => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS,
  payload: {
    data,
  },
});

export const authRequestFailed = (err) => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED,
  payload: {
    error: err,
  },
});
