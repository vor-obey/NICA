/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Skeleton,
  Card, Col, Row, Statistic,
  Typography,
} from 'antd';
import styles from './Statistics.module.scss';

const { Text } = Typography;

const colLayout = {
  xs: 24,
  sm: 12,
  xl: 8,
};

const Statistics = ({ statistics, loading }) => (
  <Row gutter={[20, 10]} style={{ alignItems: 'stretch' }}>
    {
      loading
        ? [...new Array(3)].map((item, index) => (
          <Col key={index} {...colLayout}>
            <Card className={styles.statisticCard}>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))
        : statistics.map(({ title, value }) => (
          <Col key={title} {...colLayout}>
            <Card className={styles.statisticCard}>
              <Statistic
                value={value}
                title={<Text className={styles.statisticTitle} ellipsis>{title}</Text>}
              />
            </Card>
          </Col>
        ))
    }
  </Row>
);

Statistics.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Statistics;
