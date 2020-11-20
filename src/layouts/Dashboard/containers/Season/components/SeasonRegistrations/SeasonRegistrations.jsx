import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card,
  Row,
  Col,
  Skeleton,
} from 'antd';
import SeasonRegistrationItem from './SeasonRegistrationItem';

const { Title } = Typography;

const SeasonRegistrations = ({ loading, registrations }) => (
  <Card title={<Title level={2}>Registrations</Title>}>
    <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
      <Row gutter={[0, 20]}>
        {
          registrations.map((item) => (
            <Col key={item.role} span={24}>
              <SeasonRegistrationItem {...item} />
            </Col>
          ))
        }
      </Row>
    </Skeleton>
  </Card>
);
SeasonRegistrations.propTypes = {
  loading: PropTypes.bool.isRequired,
  registrations: PropTypes.arrayOf(PropTypes.shape({})),
};

SeasonRegistrations.defaultProps = {
  registrations: [],
};

export default SeasonRegistrations;
