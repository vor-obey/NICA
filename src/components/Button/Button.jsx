import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.scss';

const buttonSizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const Button = ({
  type, size, primary, ...rest
}) => {
  const className = classNames(
    styles.button,
    primary ? styles.button_primary : styles.button_secondary,
    {
      [styles.button_small]: size === buttonSizes.small,
      [styles.button_medium]: size === buttonSizes.medium,
      [styles.button_large]: size === buttonSizes.large,
    },
  );
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading,react/button-has-type
    <button className={className} {...rest} />
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(buttonSizes)),
  type: PropTypes.string,
};

Button.defaultProps = {
  primary: false,
  size: buttonSizes.medium,
  type: 'button',
};

export default Button;
