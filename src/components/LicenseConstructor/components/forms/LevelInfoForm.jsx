import React from 'react';
import {
  Form, Typography, Modal, Input,
} from 'antd';

const { Text } = Typography;

const LevelInfoForm = ({
  visible, onCancel, onChange, onSubmit, initialValues = {},
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      destroyOnClose
      visible={visible}
      onOk={form.submit}
      onCancel={onCancel}
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        onValuesChange={onChange}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          rules={[{
            required: true,
            message: 'Missing title',
          }]}
          label={<Text strong>Level title</Text>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{
            required: true,
            message: 'Missing description',
          }]}
          label={<Text strong>Level description</Text>}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LevelInfoForm;
