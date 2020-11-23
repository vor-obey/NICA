import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import React, { useCallback } from 'react';

const RegistrationDateForm = ({ onSubmit, initialValues: { openedAt, closedAt } }) => {
  const valuesChangeHandle = useCallback((changedValues, allValues) => {
    onSubmit(allValues);
  }, [onSubmit]);

  return (
    <Form onValuesChange={valuesChangeHandle}>
      <Form.Item name="openedAt" label="Opens:">
        <DatePicker defaultValue={moment(openedAt)} />
      </Form.Item>
      <Form.Item name="closedAt" label="Closes:">
        <DatePicker defaultValue={closedAt && moment(closedAt)} />
      </Form.Item>
    </Form>
  );
};

RegistrationDateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    openedAt: PropTypes.string.isRequired,
    closedAt: PropTypes.string,
  }).isRequired,
};

export default RegistrationDateForm;
