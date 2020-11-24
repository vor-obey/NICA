import React from 'react';
import {
  Button, Space, Table, Typography, Divider,
} from 'antd';
import { EditFilled } from '@ant-design/icons';
import RegistrationDateForm from './forms/RegistrationDateForm';

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

const SeasonRegistrationEditItem = ({
  role, openedAt, closedAt, products,
}) => (

  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
    <Divider orientation="left">
      <Title
        style={{ textTransform: 'capitalize' }}
        level={3}
      >
        {`${role} season registration`}
      </Title>
    </Divider>
    <RegistrationDateForm
      onSubmit={console.log}
      initialValues={{
        openedAt,
        closedAt,
      }}
    />
    <Table rowKey="id" dataSource={products} columns={productsColumns} />
  </Space>

);
export default SeasonRegistrationEditItem;
