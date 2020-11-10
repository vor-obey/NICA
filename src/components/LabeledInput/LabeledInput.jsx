import React from 'react';
import PropTypes from 'prop-types';
import styles from './LabeledInput.module.scss';

const LabeledInput = ({ label, ...rest }) => (
  // eslint-disable-next-line react/jsx-filename-extension,jsx-a11y/label-has-associated-control
  <label className={styles.container}>
    <span className={styles.label}>
      {label}
    </span>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <input className={styles.input} {...rest} />
  </label>
);

LabeledInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default LabeledInput;
