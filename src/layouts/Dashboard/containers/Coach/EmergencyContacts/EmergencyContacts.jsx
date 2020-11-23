import React from 'react';
import { Skeleton } from 'antd';
import TableWidget from '../../../components/TableWidget';

const columns = [
  {
    width: '100px',
    title: 'Emergency contacts',
    ellipsis: true,
    dataIndex: 'contacts',
  },
  {
    title: 'First name',
    ellipsis: true,
    dataIndex: 'firstName',
  },
  {
    title: 'Last name',
    ellipsis: true,
    dataIndex: 'lastName',
  },
  {
    title: 'Cell phone',
    ellipsis: true,
    dataIndex: 'cellPhone',
  },
  {
    title: 'Cell phone',
    ellipsis: true,
    dataIndex: 'homePhone',
  },
];

const emergencyData = [
  {
    id: 1,
    contacts: 1,
    firstName: 'Lui',
    lastName: 'Jesty',
    cellPhone: '556-551-55',
    homePhone: '186-551-55',
  },
  {
    id: 2,
    contacts: 2,
    firstName: 'Jack',
    lastName: 'Gui',
    cellPhone: '546-411-55',
    homePhone: '486-751-85',
  },
];

const EmergencyContacts = ({ loading }) => (
  <Skeleton loading={loading} active>
    <TableWidget
      rowKey="id"
      columns={columns}
      dataSource={emergencyData}
    />
  </Skeleton>
);

export default EmergencyContacts;
