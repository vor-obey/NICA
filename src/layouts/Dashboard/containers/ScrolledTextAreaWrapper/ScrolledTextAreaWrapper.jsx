import React, { useState } from 'react';
import { Checkbox, Row } from 'antd';
import ScrolledTextArea from '../../../../components/ScrolledTextArea';
import styles from './ScrolledTextAreaWrapper.module.scss';

const ScrolledTextAreaWrapper = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [disable, setDisable] = useState(true);
  const onFinish = () => setDisable(false);
  const height = 300;

  const onChange = () => (
    setChecked(!checked)
  );

  return (
    <>
      <ScrolledTextArea onFinish={onFinish} height={height}>
        {children}
      </ScrolledTextArea>
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
