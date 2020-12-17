import React, { useMemo } from 'react';
import {
  Modal, Form, Input, Select, Typography,
} from 'antd';
import {} from '@ant-design/icons';
import { LICENSE_LEVEL_STEP_TYPE } from '../../../../utils/constants';

const { Text } = Typography;

const stepTypeTitle = {
  [LICENSE_LEVEL_STEP_TYPE.AGREEMENT]: 'License Agreement',
  [LICENSE_LEVEL_STEP_TYPE.VIDEO]: 'video',
  [LICENSE_LEVEL_STEP_TYPE.FILE_UPLOAD]: 'file upload',
};

const StepForm = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const typeSelectOptions = useMemo(() => Object.values(LICENSE_LEVEL_STEP_TYPE)
    .map((type) => (
      <Select.Option
        key={type}
        value={type}
      >
        {stepTypeTitle[type]}
      </Select.Option>
    )), []);

  return (
    <Modal
      destroyOnClose
      visible={visible}
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        label={<Text strong>Step type</Text>}
      >
        <Form.Item
          name="type"
          rules={[
            {
              required: true,
              message: 'Missing type',
            },
          ]}
          label={<Text strong>Step type</Text>}
        >
          <Select>
            {typeSelectOptions}
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Missing title',
            },
          ]}
          label={<Text strong>Step title</Text>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Missing description',
            },
          ]}
          label={<Text strong>Step description</Text>}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StepForm;
