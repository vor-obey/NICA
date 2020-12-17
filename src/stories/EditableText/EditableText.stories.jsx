import React from 'react';
import { Row, Col } from 'antd';
import EditableText from '../../components/EditableText';

export default {
  title: 'EditableTextInput',
  component: EditableText,
};

export const Default = () => (
  <Row gutter={20}>
    <Col>Text</Col>
    <Col>
      <EditableText onChange={console.log}>Test text</EditableText>
    </Col>
  </Row>
);
