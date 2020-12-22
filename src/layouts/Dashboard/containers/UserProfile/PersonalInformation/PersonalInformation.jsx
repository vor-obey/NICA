import React from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Button, Typography } from 'antd';
import Permissions from '../../../../../components/Permissions';
import { permissions } from '../../../../../configs/app';

const { roles: ROLES } = permissions;
const { Title } = Typography;

const PersonalInformation = ({ data }) => {
  const { userId } = useParams();
  const {
    email, firstName, lastName, birthDate, cellPhone, homePhone, workPhone, address, timeZone,
  } = data;

  const deactivate = userId && (
    <Permissions roles={[ROLES.SUPER_ADMIN, ROLES.LEAGUE_ADMIN]}>
      <Button danger>Deactivate</Button>
    </Permissions>
  );

  return (
    <Descriptions
      layout="horizontal"
      title={<Title>Personal information</Title>}
      bordered
      column={1}
      extra={deactivate}
    >
      <Descriptions.Item label="Email">{email}</Descriptions.Item>
      <Descriptions.Item label="First name">{firstName}</Descriptions.Item>
      <Descriptions.Item label="Last name">{lastName}</Descriptions.Item>
      <Descriptions.Item label="Birth date">{birthDate}</Descriptions.Item>
      <Descriptions.Item label="Cell phone">{cellPhone}</Descriptions.Item>
      <Descriptions.Item label="Home phone">{homePhone}</Descriptions.Item>
      <Descriptions.Item label="Work phone">{workPhone}</Descriptions.Item>
      <Descriptions.Item label="Street address 1">{address.line1}</Descriptions.Item>
      <Descriptions.Item label="Street address 2">{address.line2}</Descriptions.Item>
      <Descriptions.Item label="City">{address.city}</Descriptions.Item>
      <Descriptions.Item label="State">{address.state}</Descriptions.Item>
      <Descriptions.Item label="Zip code">{address.postalCode}</Descriptions.Item>
      <Descriptions.Item label="Time Zone">{timeZone}</Descriptions.Item>
    </Descriptions>
  );
};

export default PersonalInformation;
