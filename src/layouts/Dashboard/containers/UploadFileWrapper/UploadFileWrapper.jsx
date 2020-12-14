import React, { useCallback, useState } from 'react';
import {
  message, DatePicker, Row, Col,
} from 'antd';
import UploadFile from '../../../../components/Upload/UploadFile';

const UploadFileWrapper = ({ onFinish }) => {
  const [datePicker, setDatePicker] = useState(false);
  const [valueDate, setValueDate] = useState('');

  const onChangeHandler = useCallback((info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      setDatePicker(true);
    }
    if (status === 'error') {
      message.error(`${info.file.name} has incorrect data format or exceeded the allowed file size.`);
      console.log(info);
    }
  }, [onFinish]);

  const finish = (date) => {
    onFinish();
    setValueDate(date._d);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Row>
        <Col>
          <UploadFile onChange={onChangeHandler} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DatePicker
            disabled={!datePicker}
            onChange={finish}
            style={{ width: 300, marginTop: 60 }}
          />
        </Col>
      </Row>

    </div>

  );
};

export default UploadFileWrapper;
