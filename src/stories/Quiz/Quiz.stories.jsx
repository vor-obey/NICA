import React from 'react';
import faker from 'faker';
import Quiz from '../../components/Quiz';

export default {
  title: 'Quiz',
  component: Quiz,
};

const quiz = {};

const createAnswers = (length) => [...Array(length)].map((item, index) => ({
  id: index + 1,
  text: `Answer #${index + 1}`,
}));

const createQuestions = (length) => [...Array(length)].map((item, index) => ({
  id: index + 1,
  question: `Question #${index + 1}?`,
  answers: createAnswers(faker.random.number({
    min: 2,
    max: 8,
  })),
}));

export const Default = () => (
  <Quiz quiz={{
    title: 'Some Quiz Title',
    description: 'Optional Quiz desciption',
    questions: createQuestions(8),
  }}
  />
);
