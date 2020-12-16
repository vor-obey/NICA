import React, {
  useCallback, useMemo, useState, useContext,
} from 'react';
import {
  Modal, Form, Select, Typography, Input,
} from 'antd';
import { LICENSE_LEVEL_STEP_TYPE } from '../../../../utils/constants';
import AgreementForm from './components/form/AgreementForm';
import VideoStepForm from './components/form/VideoStepForm';
import FileUploadStepForm from './components/form/FileUploadStepForm';
import EditableTextInput from '../../../EditableTextInput';
import LicenseConstructorContext from '../../api/LicenseConstructorContext';

const { Title, Text } = Typography;

const stepTypes = Object.values(LICENSE_LEVEL_STEP_TYPE);

const stepTypeTitle = {
  [LICENSE_LEVEL_STEP_TYPE.AGREEMENT]: 'License Agreement',
  [LICENSE_LEVEL_STEP_TYPE.VIDEO]: 'video',
  [LICENSE_LEVEL_STEP_TYPE.FILE_UPLOAD]: 'file upload',
};

const stepsForms = {
  [LICENSE_LEVEL_STEP_TYPE.AGREEMENT]: AgreementForm,
  [LICENSE_LEVEL_STEP_TYPE.VIDEO]: VideoStepForm,
  [LICENSE_LEVEL_STEP_TYPE.FILE_UPLOAD]: FileUploadStepForm,
};

const StepConstructor = ({ visible, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const onOkModalHandle = useCallback(() => {
    form.submit();
  }, [form]);
  const onCancelModalHandle = useCallback(() => {
    onCancel();
  }, [onCancel]);
  const [selectedType, setSelectedType] = useState(LICENSE_LEVEL_STEP_TYPE.VIDEO);

  const StepForm = useMemo(() => stepsForms[selectedType], [selectedType]);
  const onFinishFormHandle = useCallback((values) => {
    onSubmit({
      ...values,
      type: selectedType,
    });
  }, []);
  return (
    <Modal
      destroyOnClose
      visible={visible}
      onOk={onOkModalHandle}
      onCancel={onCancelModalHandle}
      title={(
        <Title level={4}>{`Level Step Constructor ${selectedType}`}</Title>
      )}
    >
      <Form
        form={form}
        name="stepForm"
        layout="vertical"
        onFinish={onFinishFormHandle}
        defaultValue={{
          type: LICENSE_LEVEL_STEP_TYPE.VIDEO,
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Missing type',
            },
          ]}
          name="type"
          label={<Text strong>Step type</Text>}
        >
          <Select>
            {
              stepTypes.map(
                (type) => (
                  <Select.Option key={type} value={type}>{stepTypeTitle[type]}</Select.Option>
                ),
              )
            }
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Missing title',
            },
          ]}
          label={<Text strong>Step title</Text>}
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Missing description',
            },
          ]}
          label={<Text strong>Step description</Text>}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StepConstructor;
