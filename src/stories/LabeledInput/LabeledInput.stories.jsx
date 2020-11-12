import React from 'react';
import LabeledInput from '../../components/LabeledInput';

export default {
  title: 'LabeledInput',
  decorators: [(Story) => <div style={{ width: '500px' }}><Story /></div>],
};

export const Template = (args) => <LabeledInput label="YOUR_LABEL" {...args} />;

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  label: 'Password',
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  type: 'checkbox',
  label: 'Checkbox',
};
