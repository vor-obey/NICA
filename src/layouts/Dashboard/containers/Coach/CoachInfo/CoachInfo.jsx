import React from 'react';
import { Descriptions, Skeleton } from 'antd';

const CoachInfo = ({ loading }) => (
  <Skeleton loading={loading} active>
    <Descriptions layout="horizontal" bordered column={1}>
      <Descriptions.Item label="League">Allatona Creek Composite</Descriptions.Item>
      <Descriptions.Item label="Proffesion">Retired</Descriptions.Item>
      <Descriptions.Item label="Child Partisipating in the liguage">Yes</Descriptions.Item>
      <Descriptions.Item label="Race/Ethnicity" />
      <Descriptions.Item label="Household size" />
      <Descriptions.Item label="Household income" />
    </Descriptions>
  </Skeleton>
);

export default CoachInfo;
