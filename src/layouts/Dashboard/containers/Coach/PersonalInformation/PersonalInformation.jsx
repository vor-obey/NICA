import React from 'react';
import { Descriptions, Skeleton } from 'antd';

const PersonalInformation = ({ data, loading }) => {
  if (!data) {
    return null;
  }
  const {
    email, name, gender, birthday, phone, address,
  } = data;

  return (
    <Skeleton loading={loading} active>
      <Descriptions layout="horizontal" bordered column={1}>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="First name">{name.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last name">{name.lastName}</Descriptions.Item>
        <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
        <Descriptions.Item label="Birth date">{birthday}</Descriptions.Item>
        <Descriptions.Item label="Cell phone">{phone.cellPhone}</Descriptions.Item>
        <Descriptions.Item label="Home phone">{phone.homePhone}</Descriptions.Item>
        <Descriptions.Item label="Work phone">{phone.workPhone}</Descriptions.Item>
        <Descriptions.Item label="Street address 1">{address.street1}</Descriptions.Item>
        <Descriptions.Item label="Street address 2">{address.street2}</Descriptions.Item>
        <Descriptions.Item label="City">{address.city}</Descriptions.Item>
        <Descriptions.Item label="State">{address.state}</Descriptions.Item>
        <Descriptions.Item label="Zip code">{address.zip}</Descriptions.Item>
        <Descriptions.Item label="Time Zone">{address.zone}</Descriptions.Item>
      </Descriptions>
    </Skeleton>
  );
};

export default PersonalInformation;
