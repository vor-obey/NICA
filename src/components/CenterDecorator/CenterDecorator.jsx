import React from 'react';
import './CenterDecorator.module.scss';

const Center = ({ children }) => (
  <div className="center_wrapper">
    {children}
  </div>
);

export default Center;
