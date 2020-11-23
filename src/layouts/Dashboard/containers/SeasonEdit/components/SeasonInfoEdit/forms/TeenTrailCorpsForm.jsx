import React, { useCallback } from 'react';
import { Form, Switch } from 'antd';
import PropTypes from 'prop-types';

const TeenTrailCorpsForm = ({ onSubmit, initialValues }) => {
  const valuesChangeHandle = useCallback((changedValues, allValues) => {
    onSubmit(allValues);
  }, [onSubmit]);
  return (
    <Form onValuesChange={valuesChangeHandle} initialValues={initialValues}>
      <Form.Item
        valuePropName="checked"
        name="allowCoachesReportTTCHours"
        label="Allow coaches to report TTC hours"
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};

TeenTrailCorpsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    allowCoachesReportTTCHours: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TeenTrailCorpsForm;
