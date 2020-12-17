import produce from 'immer';
import ACTIONS from './actions';

const handlers = {
  [ACTIONS.ADD_LEVEL]: produce((state) => {
    state.levels.push({
      title: '',
      description: '',
      steps: [],
    });
  }),
  [ACTIONS.REMOVE_LEVEL]: produce((state, action) => {
    const { payload: { index } } = action;
    state.levels.splice(index, 1);
  }),
  [ACTIONS.UPDATE_LICENSE]: (state, action) => {
    const { payload: { values } } = action;
    return {
      ...state,
      ...values,
    };
  },
  [ACTIONS.UPDATE_LEVEL]: produce((state, action) => {
    const { payload: { levelIndex, values } } = action;
    // eslint-disable-next-line no-param-reassign
    state.levels[levelIndex] = {
      ...state.levels[levelIndex],
      ...values,
    };
  }),
  [ACTIONS.ADD_STEP]: produce((state, action) => {
    const { payload: { levelIndex, values } } = action;
    state.levels[levelIndex].steps.push(values);
  }),
  [ACTIONS.REMOVE_STEP]: produce((state, action) => {
    const { payload: { levelIndex, stepIndex } } = action;
    state.levels[levelIndex].steps.splice(stepIndex, 1);
  }),
};

const licenseConstructorReducer = (state, action) => {
  const { type } = action;
  if (type in handlers) {
    return handlers[type](state, action);
  }
  return state;
};

export default licenseConstructorReducer;
