import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { EditFilled } from '@ant-design/icons';
import TableWidget from '../../../../components/TableWidget';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Allowed Riders',
    dataIndex: 'allowedRidersStatus',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Open',
    dataIndex: 'open',
    render: (v) => (v ? 'Yes' : 'No'),
  },
  {
    title: 'Edit',
    key: 'edit',
    render: (v, record) => <Button type="primary" icon={<EditFilled />}>Edit</Button>,
  },
];

const SeasonSchedule = ({ loading, events }) => (
  <>
    <TableWidget
      title="Events"
      columns={columns}
      loading={loading}
      dataSource={events}
    />
  </>
);

SeasonSchedule.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SeasonSchedule;
