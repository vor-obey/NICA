import React, { useCallback } from 'react';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import PropTypes from 'prop-types';

const dateFormat = 'DD/MM/YYYY';

const formItemStyle = {
  margin: 0,
};

const GeneralInfoForm = ({ onSubmit, initialValues }) => {
  const { startDate } = initialValues;
  const fieldsChangeHandle = useCallback((changedFields, allFields) => {
    onSubmit(allFields);
  }, [onSubmit]);
  return (
    <Form onFieldsChange={fieldsChangeHandle} initialValues={initialValues}>
      <Form.Item
        style={formItemStyle}
        name="startDate"
      >
        <DatePicker defaultValue={moment(startDate)} format={dateFormat} />
      </Form.Item>
    </Form>
  );
};
GeneralInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default GeneralInfoForm;
