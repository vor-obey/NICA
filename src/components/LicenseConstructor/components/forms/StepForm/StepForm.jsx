import React, { useMemo } from 'react';
import {
  Modal, Form, Input, Select, Typography,
} from 'antd';
import * as Yup from 'yup';
import styles from './StepForm.module.scss';
import { LICENSE_LEVEL_STEP_TYPE } from '../../../../../utils/constants';

const VIDEO_URL_SCHEMA = Yup.string()
  .url('Video path must be an URL value!')
  .required('Video path is required value!');

const { Text } = Typography;

const stepTypeTitle = {
  [LICENSE_LEVEL_STEP_TYPE.AGREEMENT]: 'License Agreement',
  [LICENSE_LEVEL_STEP_TYPE.VIDEO]: 'video',
  [LICENSE_LEVEL_STEP_TYPE.FILE_UPLOAD]: 'file upload',
};

const defaultInitialValues = {
  type: null,
  title: '',
  description: '',
  agreement: '',
  videoURL: '',
};

const StepForm = ({
  visible, onCancel, onSubmit, initialValues,
}) => {
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
      className={styles.modal}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        label={<Text strong>Step type</Text>}
        defaultValue={defaultInitialValues}
        initialValues={{
          ...defaultInitialValues,
          ...initialValues,
        }}
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
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
        >
          {
            ({ getFieldValue }) => getFieldValue('type') === LICENSE_LEVEL_STEP_TYPE.AGREEMENT && (
              <Form.Item
                label={<Text strong>Agreement</Text>}
                name="agreement"
                rules={[
                  {
                    required: true,
                    message: 'Missing agreement text',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
        >
          {
            ({ getFieldValue }) => getFieldValue('type') === LICENSE_LEVEL_STEP_TYPE.VIDEO && (
              <Form.Item
                name="videoURL"
                label={<Text strong>Video URL</Text>}
                rules={[
                  {
                    required: true,
                    message: 'Missing video URL',
                  },
                  {
                    validator: (rule, value) => VIDEO_URL_SCHEMA.validate(value),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StepForm;
