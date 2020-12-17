import React from 'react';
import StepForm from '../forms/StepForm';

const StepConstructor = ({ visible, onSubmit, onCancel }) => (
  <StepForm visible={visible} onCancel={onCancel} onSubmit={onSubmit} />
);

export default StepConstructor;
