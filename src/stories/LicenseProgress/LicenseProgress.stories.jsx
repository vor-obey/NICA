import React from 'react';
import LicenseProgress from '../../components/LicenseProgress';
import Quiz from '../../components/Quiz';
import { createQuiz } from '../Quiz/Quiz.stories';
import { LICENSE_LEVEL_STEP_TYPE } from '../../utils/constants';

export default {
  title: 'License progress steps',
  component: LicenseProgress,
  argTypes: {
    layout: {
      control: {
        type: 'select',
        options: [
          'vertical',
          'horizontal',
        ],
      },
    },
  },
};

const LicenseProgressStory = ({ steps, ...rest }) => (
  <LicenseProgress steps={steps} {...rest}>
    {
      steps.map(() => <Quiz quiz={createQuiz()} onSubmit={console.log} />)
    }
  </LicenseProgress>
);

export const Default = LicenseProgressStory.bind({});
Default.args = {
  steps: [
    {
      id: 1,
      title: 'First license step',
      description: 'First license step description',
      type: LICENSE_LEVEL_STEP_TYPE.VIDEO,
    },
    {
      id: 2,
      title: 'Second license step',
      description: 'Second license step description',
      type: LICENSE_LEVEL_STEP_TYPE.FILE_UPLOAD,
    },
    {
      id: 3,
      title: 'Third license step',
      description: 'Third license step description',
      type: LICENSE_LEVEL_STEP_TYPE.AGREEMENT,
    },
  ],
  layout: 'vertical',
};
