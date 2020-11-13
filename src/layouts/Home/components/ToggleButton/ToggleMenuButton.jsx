import React from 'react';
import PropTypes from 'prop-types';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const ToggleButton = ({ isOpen, ...props }) => {
  const Icon = isOpen ? MenuUnfoldOutlined : MenuFoldOutlined;
  return <Icon {...props} />;
};

ToggleButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;
