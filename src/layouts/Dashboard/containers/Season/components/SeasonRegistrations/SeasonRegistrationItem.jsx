import moment from 'moment';
import React, { useCallback } from 'react';
import {
  Alert, Button, Descriptions, Space, Table, Typography, Divider,
} from 'antd';
import { EditFilled, NotificationOutlined } from '@ant-design/icons';

const { Title } = Typography;

const productsColumns = [
  {
    dataIndex: 'name',
    title: 'Product',
  },
  {
    dataIndex: 'price',
    title: 'Price',
    render: (text) => `$${text}`,
  },
  {
    key: 'actions',
    render: () => <Button type="primary" icon={<EditFilled />}>Edit</Button>,
  },
];

const SeasonRegistrationItem = ({
  role, openedAt, closedAt, products, lateFee,
}) => {
  const renderLateFee = useCallback(() => {
    if (lateFee) {
      const { name, startedAt } = lateFee;
      return (
        <Alert
          showIcon
          type="error"
          message={name}
          icon={<NotificationOutlined />}
          description={`The late fee is effected now! Is in effect starting ${moment(startedAt)
            .format('YYYY-MM-DD HH:mm')}`}
        />
      );
    }
    return null;
  }, [lateFee]);

  return (

    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Divider orientation="left">
        <Title
          style={{ textTransform: 'capitalize' }}
          level={3}
        >
          {`${role} season registration`}
        </Title>
      </Divider>
      <Alert
        showIcon
        icon={<NotificationOutlined />}
        type={closedAt ? 'error' : 'success'}
        message={`Registration is ${closedAt ? 'closed' : 'open'} now.`}
      />
      {
        renderLateFee()
      }
      <Descriptions bordered layout="horizontal" column={1}>
        <Descriptions.Item label="Opens">
          {openedAt}
        </Descriptions.Item>
        <Descriptions.Item label="Closes">
          {closedAt || 'not set'}
        </Descriptions.Item>
      </Descriptions>
      <Table rowKey="id" dataSource={products} columns={productsColumns} />
    </Space>

  );
};
export default SeasonRegistrationItem;
