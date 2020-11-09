import produce from 'immer';
import createReducer from './helpers/createReducer';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const handlers = {
  [AUTH_ACTION_TYPES.AUTH_REQUEST_FETCHING]: produce((draftState) => {
    draftState.isFetching = true;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS]: produce((draftState, action) => {
    const { payload: { data: { user } } } = action;
    draftState.user = user;
    draftState.isFetching = false;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED]: produce((draftState, action) => {
    const { payload: { error } } = action;
    draftState.error = error;
    draftState.isFetching = false;
  }),
};

const authReducer = createReducer(initialState, handlers);

export default authReducer;
