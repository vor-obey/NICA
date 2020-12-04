import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const Answer = (props) => {
  const { answer: { id, text } } = props;
  return (
    <Radio
      value={id}
    >
      {text}
    </Radio>
  );
};

export const AnswerPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
});

Answer.propTypes = {
  answer: AnswerPropType.isRequired,
};

export default Answer;
