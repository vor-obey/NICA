import React from 'react';
import 'antd/dist/antd.css';
import SignUpForm from '../../layouts/Auth/components/SignUpForm';

export default {
  title: 'SignUpForm',
  components: SignUpForm,
};

export const Template = () => (
  <SignUpForm onSubmit={() => {
  }}
  />
);
