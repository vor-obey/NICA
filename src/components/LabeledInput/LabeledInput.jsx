import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, Label, FormGroup, FormFeedback,
} from 'reactstrap';
import { useField } from 'formik';

const LabeledInput = ({ label, type, ...rest }) => {
  const [field, { error, touched }] = useField(rest);

  return (
    <FormGroup className="position-relative d-flex flex-column w-100">
      <Label>
        <span>
          {label}
        </span>
        <Input type={type} invalid={error && touched} {...field} />
        {error && <FormFeedback tooltip>{error}</FormFeedback>}
      </Label>
    </FormGroup>
  );
};

LabeledInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

LabeledInput.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default LabeledInput;
