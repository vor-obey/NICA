import React from 'react';
import { Descriptions, Skeleton } from 'antd';

const HealthInformation = ({ loading }) => (
  <Skeleton loading={loading} active>
    <Descriptions layout="horizontal" bordered column={1}>
      <Descriptions.Item label="Health insurance provider">Anthem Blue Cross Blue Shield</Descriptions.Item>
      <Descriptions.Item label="Health insurance group">DF98894AF8</Descriptions.Item>
      <Descriptions.Item label="Health insurance policy number">DF98894AF8</Descriptions.Item>
      <Descriptions.Item label="In good physical and mental health">Yes</Descriptions.Item>
      <Descriptions.Item label="Has medical conditions">No</Descriptions.Item>
      <Descriptions.Item label="Asthma inhaler">No</Descriptions.Item>
      <Descriptions.Item label="Prescription medication">Yes</Descriptions.Item>
      <Descriptions.Item label="Medication details">Levothyroxine 137mcg</Descriptions.Item>
    </Descriptions>
  </Skeleton>
);

export default HealthInformation;
