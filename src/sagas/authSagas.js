import { put, call } from 'redux-saga/effects';
import * as authActionCreators from '../actions/authActionCreators';
import * as api from '../api';

export function* loginSaga(action) {
  yield put(authActionCreators.authRequestFetching());
  try {
    const { payload: { data: actionData } } = action;
    const { data } = yield call(api.auth.login, actionData);
    yield put(authActionCreators.authRequestSuccess(data));
  } catch (err) {
    yield put(authActionCreators.authRequestFailed(err));
  }
}

export function* signUpSaga(action) {
  yield put(authActionCreators.authRequestFetching());
  try {
    const { payload: { data: actionData } } = action;
    const { data } = yield call(api.auth.signUp, actionData);
    yield put(authActionCreators.authRequestSuccess(data));
  } catch (err) {
    yield put(authActionCreators.authRequestFailed(err));
  }
}

export function* logoutSaga() {
  yield call(api.auth.logout);
}
