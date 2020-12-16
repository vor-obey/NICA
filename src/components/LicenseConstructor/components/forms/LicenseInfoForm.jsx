import React from 'react';
import {
  Form, Typography, Modal, Input,
} from 'antd';

const { Text } = Typography;

const LicenseInfoForm = ({
  visible, onSubmit, onCancel, onChange, initialValues = {},
}) => {
  const [form] = Form.useForm();
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={form.submit}>
      <Form
        form={form}
        onFinish={onSubmit}
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
    </Modal>
  );
};

export default LicenseInfoForm;
