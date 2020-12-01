import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const colLayout = {
  xs: {
    span: 22,
  },
  sm: {
    span: 20,
  },
  md: {
    span: 18,
  },
  lg: {
    span: 7,
  },
};

const rowGutter = [20, {
  xs: 10,
  sm: 20,
  lg: 0,
}];

const DashboardFooter = (props) => (
  <Footer
    style={{
      backgroundColor: '#f0f0f0',
      boxShadow: '4px 1px 0 rgba(0, 21, 41, 0.08)',
    }}
    {...props}
  >
    <Row
      gutter={rowGutter}
      justify="space-around"
      align="middle"
    >
      <Col
        {...colLayout}
      >
        <div style={{
          height: '80px',
          backgroundColor: '#d9d9d9',
        }}
        />
      </Col>
      <Col
        {...colLayout}
      >
        <div style={{
          height: '80px',
          backgroundColor: '#d9d9d9',
        }}
        />
      </Col>
      <Col
        {...colLayout}
      >
        <div style={{
          height: '80px',
          backgroundColor: '#d9d9d9',
        }}
        />
      </Col>
    </Row>
  </Footer>
);

export default DashboardFooter;
