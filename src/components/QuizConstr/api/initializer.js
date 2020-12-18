const defaultValues = {
  questions: [],
};

const initializer = (quiz) => {
  if (quiz) {
    return quiz;
  }
  return defaultValues;
};

export default initializer;
