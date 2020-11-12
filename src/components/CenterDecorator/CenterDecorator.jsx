import React from 'react';
import './CenterDecorator.scss';

const Center = ({ children }) => (
  <div className="center_wrapper">
    {children}
  </div>
);

export default Center;
