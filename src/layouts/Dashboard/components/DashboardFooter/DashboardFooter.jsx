import React from 'react';
import { Layout, Row, Col } from 'antd';
import styles from './DashboardFooter.module.scss';

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
    className={styles.footerDashboard}
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
        <div className={styles.section}>
          FOOTER CONTENT #1
        </div>
      </Col>
      <Col
        {...colLayout}
      >
        <div className={styles.section}>
          FOOTER CONTENT #2
        </div>
      </Col>
      <Col
        {...colLayout}
      >
        <div className={styles.section}>
          FOOTER CONTENT #3
        </div>
      </Col>
    </Row>
  </Footer>
);

export default DashboardFooter;
