import React from 'react';
import {
  Card, Statistic, Row, Col,
} from 'antd';

const Statistics = ({ statistics }) => (
  <Card title="Statistics">
    <Row gutter="20">
      {
        statistics.map(({ name, value }) => (
          <Col key={name}>
            <Card>
              <Statistic title={name} value={value} />
            </Card>
          </Col>
        ))
      }
    </Row>
  </Card>
);

export default Statistics;
