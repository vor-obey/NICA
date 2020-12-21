/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import produce from 'immer';
import ACTIONS from './actions';

let stepId = Date.now();
let levelId = Date.now();

const handlers = {
  [ACTIONS.ADD_LEVEL]: produce((state) => {
    state.levels.push({
      id: levelId++,
      title: '',
      description: '',
      steps: [],
    });
  }),
  [ACTIONS.REMOVE_LEVEL]: produce((state, action) => {
    const { payload: { levelIndex } } = action;
    state.levels.splice(levelIndex, 1);
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
    state.levels[levelIndex] = {
      ...state.levels[levelIndex],
      ...values,
    };
  }),
  [ACTIONS.ADD_STEP]: produce((state, action) => {
    const { payload: { levelIndex } } = action;
    state.levels[levelIndex].steps.push({
      id: stepId++,
    });
  }),
  [ACTIONS.UPDATE_STEP]: produce((state, action) => {
    const {
      payload: {
        stepIndex, levelIndex, values,
      },
    } = action;

    const step = state.levels[levelIndex].steps[stepIndex];

    state.levels[levelIndex].steps[stepIndex] = {
      ...step,
      ...values,
    };
  }),
  [ACTIONS.REMOVE_STEP]: produce((state, action) => {
    const { payload: { levelIndex, stepIndex } } = action;
    state.levels[levelIndex].steps.splice(stepIndex, 1);
  }),
  [ACTIONS.MOVE_STEP]: produce((state, action) => {
    const { payload: { drag, drop } } = action;
    const [step] = state.levels[drag.levelIndex].steps.splice(drag.stepIndex, 1);
    state.levels[drop.levelIndex].steps.splice(drop.stepIndex ?? 0, 0, step);
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
