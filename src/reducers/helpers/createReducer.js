/**
 * @typedef {Object} State
 */

/**
 * @typedef {Object} Action
 * @property {string} type - action type.
 */

/**
 *
 * @param {State} initialState
 * @param {Object} handlers
 * @returns {function(State=, Action): State}
 */
const createReducer = (initialState, handlers) => (state = initialState, action) => {
  const { type } = action;
  if (type in handlers) {
    return handlers[type](state, action);
  }
  return state;
};

export default createReducer;
