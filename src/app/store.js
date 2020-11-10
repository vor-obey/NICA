import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas';
import reducer from '../reducers';

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
export default store;
