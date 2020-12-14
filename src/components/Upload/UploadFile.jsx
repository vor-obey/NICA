import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Col, Upload } from 'antd';

const { Dragger } = Upload;

const edit = {
  type: '.png',
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
};

const UploadFile = ({ onChange }) => (
  <Col style={{ height: '100%', marginBottom: 20 }}>
    <Dragger
      {...edit}
      onChange={onChange}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other
        band files
      </p>
    </Dragger>
  </Col>
);

export default UploadFile;
