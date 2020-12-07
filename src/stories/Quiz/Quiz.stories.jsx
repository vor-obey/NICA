import React from 'react';
import Quiz from '../../components/Quiz';

const createAnswers = (length) => [...Array(length)].map((item, index) => ({
  id: index + 1,
  text: `Answer #${index + 1}`,
}));

const createQuestions = (questions, answers) => [...Array(questions)].map((item, index) => ({
  id: index + 1,
  question: `Question #${index + 1}?`,
  answers: createAnswers(answers),
}));

export const createQuiz = () => ({
  title: 'Quiz Title',
  description: 'Quiz Descriptions',
  questions: createQuestions(6, 4),
});

export default {
  title: 'Quiz',
  component: Quiz,
  argTypes: {
    questions: {
      control: {
        type: 'range',
        min: 2,
        max: 200,
        step: 1,
      },
    },
    answers: {
      control: {
        type: 'range',
        min: 2,
        max: 10,
        step: 1,
      },
    },
    parameters: { actions: { argTypesRegex: '^on.*' } },
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

const QuizStory = ({
  questions, answers, title, description, ...rest
}) => (
  <Quiz
    quiz={{
      title,
      description,
      questions: createQuestions(+questions, +answers),
    }}
    {...rest}
  />
);

export const Default = QuizStory.bind({});

Default.args = {
  title: 'Some Quiz Title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi consequatur cum dolorem doloremque facere harum in incidunt iste itaque nostrum officia quas, tempore, vel voluptate? Accusamus at exercitationem iure molestiae molestias neque nihil optio, quae quas rerum, ut, veniam?',
  questions: 10,
  answers: 4,
};
