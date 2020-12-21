import React from 'react';
import {
  Form, Typography, Input,
} from 'antd';

const { Text } = Typography;

const LicenseInfoForm = ({
  onChange, initialValues = {},
}) => (
  <Form
    layout="vertical"
    onValuesChange={onChange}
    initialValues={initialValues}
  >
    <Form.Item
      name="title"
      rules={[{
        required: true,
        message: 'Missing title',
      }]}
      label={<Text strong>License title</Text>}
    >
      <Input placeholder="license title.." />
    </Form.Item>
    <Form.Item
      name="description"
      rules={[{
        required: true,
        message: 'Missing description',
      }]}
      label={<Text strong>License description</Text>}
    >
      <Input.TextArea placeholder="license description.." />
    </Form.Item>
  </Form>
);

export default React.memo(LicenseInfoForm);
