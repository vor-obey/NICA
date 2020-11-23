import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import React, { useCallback } from 'react';

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
    <Form onFieldsChange={fieldsChangeHandle}>
      <Form.Item
        style={formItemStyle}
        name="startDate"
      >
        <DatePicker defaultValue={moment(startDate)} />
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
