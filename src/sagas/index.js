import { takeLatest } from 'redux-saga/effects';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';
import * as authSagas from './authSagas';

function* rootSaga() {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_REQUEST, authSagas.loginSaga);
  yield takeLatest(AUTH_ACTION_TYPES.SIGN_UP_REQUEST, authSagas.signUpSaga);
  yield takeLatest(AUTH_ACTION_TYPES.LOGOUT, authSagas.logoutSaga);
}

export default rootSaga;
