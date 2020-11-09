import { put, call } from 'redux-saga/effects';
import * as authActionCreators from '../actions/authActionCreators';
import * as api from '../api';

const createAuthSaga = (apiMethod) => function* authSaga(action) {
  yield put(authActionCreators.authRequestFetching());
  try {
    const { payload: { data: actionData } } = action;
    const { data } = yield call(apiMethod, actionData);
    yield put(authActionCreators.authRequestSuccess(data));
  } catch (err) {
    yield put(authActionCreators.authRequestFailed(err));
  }
};

export const loginSaga = createAuthSaga(api.auth.login);
export const signUpSaga = createAuthSaga(api.auth.signUp);
