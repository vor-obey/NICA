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

export const removeLevel = (levelIndex) => ({
  type: ACTIONS.REMOVE_LEVEL,
  payload: {
    levelIndex,
  },
});

export const updateLevel = (levelIndex, values) => ({
  type: ACTIONS.UPDATE_LEVEL,
  payload: {
    levelIndex,
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

/**
 *
 * @param levelIndex
 * @param stepIndex
 * @returns {{payload: {levelIndex: *, stepIndex: *}, type: string}}
 */
export const removeStep = (levelIndex, stepIndex) => ({
  type: ACTIONS.REMOVE_STEP,
  payload: {
    levelIndex,
    stepIndex,
  },
});

/**
 *
 * @param {Object} options
 * @param {Object} options.drag
 * @param {number} options.drag.levelIndex
 * @param {number} options.drag.stepIndex
 * @param {Object} options.drop
 * @param {number} options.drop.levelIndex
 * @param {number} options.drop.stepIndex
 * @returns {{payload: {drop: *, drag: *}, type: string}}
 */
export const moveStep = (options) => ({
  type: ACTIONS.MOVE_STEP,
  payload: options,
});
