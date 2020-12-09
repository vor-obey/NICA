import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Col, Upload } from 'antd';

const { Dragger } = Upload;

const edit = {
  type: ['png', 'txt'],
  size: 250000,
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} has incorrect data format or exceeded the allowed file size.`);
    }
  },
};

const UploadFile = () => (
  <Col style={{ height: 200 }}>
    <Dragger {...edit}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
  </Col>
);

export default UploadFile;
