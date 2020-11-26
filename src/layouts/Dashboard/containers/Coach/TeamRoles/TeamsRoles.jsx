import React from 'react';
import { Descriptions, Skeleton } from 'antd';

const TeamRoles = ({ loading }) => (
  <Skeleton loading={loading} active>
    <Descriptions layout="horizontal" bordered column={1}>
      <Descriptions.Item label="League Director">No</Descriptions.Item>
      <Descriptions.Item label="Head Coach">No</Descriptions.Item>
    </Descriptions>
  </Skeleton>
);

export default TeamRoles;
