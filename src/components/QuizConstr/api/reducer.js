/* eslint-disable no-param-reassign */

import produce from 'immer';
import ACTIONS from './actions';

const handlers = {
  [ACTIONS.ADD_QUESTION]: produce((state, action) => {
    const { payload: { defaultQuestion } } = action;
    state.questions.push(defaultQuestion);
  }),
  [ACTIONS.ADD_ANSWER]: produce((state, action) => {
    const { payload: { questionIndex, defaultAnswer } } = action;
    state.questions[questionIndex].answers.push(defaultAnswer);
  }),
  [ACTIONS.REMOVE_ANSWER]: produce((state, action) => {
    const { payload: { questionIndex, deleteIndex } } = action;
    state.questions[questionIndex].answers.splice(deleteIndex, 1);
  }),
  [ACTIONS.REMOVE_QUESTION]: produce((state, action) => {
    const { payload: { questionIndex } } = action;
    state.questions.splice(questionIndex, 1);
  }),
  [ACTIONS.ANSWER_INFO_CHANGE]: produce((state, action) => {
    const { payload: { questionIndex, value, index } } = action;
    state.questions[questionIndex].answers[index].text = value;
  }),
  [ACTIONS.QUESTION_INFO_CHANGE]: produce((state, action) => {
    const { payload: { questionIndex, value } } = action;
    state.questions[questionIndex].question = value;
  }),
  [ACTIONS.SET_CORRECT_ANSWER]: produce((state, action) => {
    const { payload: { questionIndex, value, index } } = action;
    state.questions[questionIndex].answers[index].isCorrectAnswer = value;
  }),
  [ACTIONS.CREATE_QUIZ]: (state) => ({
    ...state,
  }),
};

const quizConstructorReducer = (state, action) => {
  const { type } = action;
  if (type in handlers) {
    return handlers[type](state, action);
  }
  return state;
};

export default quizConstructorReducer;
