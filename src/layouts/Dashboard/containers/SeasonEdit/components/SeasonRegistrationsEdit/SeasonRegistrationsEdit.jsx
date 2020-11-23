import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card,
  Row,
  Col,
  Skeleton,
} from 'antd';
import SeasonRegistrationEditItem from './SeasonRegistrationEditItem';

const { Title } = Typography;

const SeasonRegistrationsEdit = ({ loading, registrations }) => (
  <Card title={<Title level={2}>Registrations</Title>}>
    <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
      <Row gutter={[0, 20]}>
        {
          registrations.map((item) => (
            <Col key={item.role} span={24}>
              <SeasonRegistrationEditItem {...item} />
            </Col>
          ))
        }
      </Row>
    </Skeleton>
  </Card>
);
SeasonRegistrationsEdit.propTypes = {
  loading: PropTypes.bool.isRequired,
  registrations: PropTypes.arrayOf(PropTypes.shape({})),
};

SeasonRegistrationsEdit.defaultProps = {
  registrations: [],
};

export default SeasonRegistrationsEdit;
