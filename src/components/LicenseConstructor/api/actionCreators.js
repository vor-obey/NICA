import ACTIONS from './actions';

export const updateLicense = (values) => ({
  type: ACTIONS.UPDATE_LICENSE,
  payload: {
    values,
  },
});

export const addLevel = (values) => ({
  type: ACTIONS.ADD_LEVEL,
  payload: {
    values,
  },
});

export const removeLevel = (index) => ({
  type: ACTIONS.REMOVE_LEVEL,
  payload: {
    index,
  },
});

export const updateLevel = (index, values) => ({
  type: ACTIONS.UPDATE_LEVEL,
  payload: {
    levelIndex: index,
    values,
  },
});

export const addStep = (levelIndex, values) => ({
  type: ACTIONS.ADD_STEP,
  payload: {
    levelIndex,
    values,
  },
});

export const updateStep = (levelIndex, stepIndex, values) => ({
  type: ACTIONS.UPDATE_STEP,
  payload: {
    levelIndex,
    stepIndex,
    values,
  },
});

export const removeStep = (levelIndex, stepIndex) => ({
  type: ACTIONS.REMOVE_STEP,
  payload: {
    levelIndex,
    stepIndex,
  },
});

export const moveStep = (dragOptions, dropOptions) => ({
  type: ACTIONS.MOVE_STEP,
  payload: {
    drag: dragOptions,
    drop: dropOptions,
  },
});
