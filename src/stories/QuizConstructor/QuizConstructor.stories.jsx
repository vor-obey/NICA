import React from 'react';
import { Card, Col, Row } from 'antd';
import QuizConstructor from '../../components/QuizConstr/QuizConstr';

export default {
  title: 'QuizConstructor',
  component: QuizConstructor,
};

export const Example = () => (
  <Row justify="center">
    <Col span={12}>
      <Card>
        <QuizConstructor onSubmit={console.log} />
      </Card>
    </Col>
  </Row>
);
