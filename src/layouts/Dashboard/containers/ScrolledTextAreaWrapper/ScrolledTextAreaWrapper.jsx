import React, { useEffect, useState } from 'react';
import { Checkbox, Row } from 'antd';
import ScrolledTextArea from '../../../../components/ScrolledTextArea';
import styles from './ScrolledTextAreaWrapper.module.scss';

const ScrolledTextAreaWrapper = ({ document, onFinish }) => {
  const [checked, setChecked] = useState(false);
  const [disable, setDisable] = useState(true);
  const height = 300;

  const onFinishHandle = () => {
    setDisable(false);
  };

  useEffect(() => {
    if (checked) {
      onFinish();
    }
  }, [checked]);

  const onChange = () => (
    setChecked(true)
  );

  return (
    <>
      <ScrolledTextArea onFinish={onFinishHandle} height={height} document={document} />
      <Row className={styles.checkboxPosition}>
        <Checkbox
          checked={checked}
          disabled={disable}
          onChange={onChange}
        >
          Agree with license
        </Checkbox>
      </Row>
    </>
  );
};

export default ScrolledTextAreaWrapper;
