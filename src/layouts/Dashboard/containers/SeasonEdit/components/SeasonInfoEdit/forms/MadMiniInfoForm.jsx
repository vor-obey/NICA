import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const MadMiniInfoForm = ({ onSubmit, initialValues }) => {
  const fieldsChangeHandle = useCallback((changedFields, allFields) => {
    onSubmit(allFields);
  }, [onSubmit]);

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFieldsChange={fieldsChangeHandle}
    >
      <Form.Item
        name="riderNewsletterId"
        label="Rider Newsletter ID"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="coachNewsletterId"
        label="Coach Newsletter ID"
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

MadMiniInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    riderNewsletterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    coachNewsletterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default MadMiniInfoForm;
