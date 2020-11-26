import React from 'react';
import { Descriptions, Skeleton } from 'antd';

const CoachAdmin = ({ loading }) => (
  <Skeleton loading={loading} active>
    <Descriptions layout="horizontal" bordered column={1}>
      <Descriptions.Item label="League">Allatona Creek Composite</Descriptions.Item>
    </Descriptions>
  </Skeleton>
);

export default CoachAdmin;
