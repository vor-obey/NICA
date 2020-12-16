import produce from 'immer';
import ACTIONS from './actions';

const handlers = {
  [ACTIONS.ADD_LEVEL_TO_LICENSE]: produce((state) => {
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
  [ACTIONS.LICENSE_INFO_CHANGE]: (state, action) => {
    const { payload: { values } } = action;
    return {
      ...state,
      ...values,
    };
  },
  [ACTIONS.LEVEL_CHANGE]: (state, action) => {
    const { payload: { index, values } } = action;
    const levels = [...state.levels];
    levels[index] = {
      ...levels[index],
      ...values,
    };
    return {
      ...state,
      levels,
    };
  },
  [ACTIONS.ADD_STEP_TO_LEVEL]: produce((state, action) => {
    const { payload: { index, values } } = action;
    state.levels[index].steps.push(values);
  }),
  [ACTIONS.REMOVE_STEP_FROM_LEVEL]: produce((state, action) => {
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
