export const QUIZ_CONSTRUCTOR_KEY = 'QUIZ_CONSTRUCTOR';

const defaultValues = {
  id: Date.now(),
  title: '',
  description: '',
  questions: [{
    id: Date.now(),
    question: 'Question 1',
    answers: [{
      text: 'Answer 1',
      isCorrect: false,
    }],
  }],
};

const initializer = (quiz) => {
  if (quiz) return quiz;

  const savedData = localStorage.getItem(QUIZ_CONSTRUCTOR_KEY);

  if (savedData) return JSON.parse(savedData);

  return defaultValues;
};

export default initializer;
