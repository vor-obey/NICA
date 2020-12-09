import React, { useCallback } from 'react';
import { message } from 'antd';
import UploadFile from '../../../../components/Upload/UploadFile';

const UploadFileWrapper = ({ onFinish }) => {
  const onChangeHandler = useCallback((info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      onFinish();
    }
    if (status === 'error') {
      message.error(`${info.file.name} has incorrect data format or exceeded the allowed file size.`);
    }
  }, [onFinish]);

  return (
    <UploadFile onChange={onChangeHandler} />
  );
};

export default UploadFileWrapper;
