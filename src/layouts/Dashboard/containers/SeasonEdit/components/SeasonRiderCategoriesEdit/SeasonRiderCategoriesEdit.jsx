import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Table, Typography, Button, Input,
} from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const { Title } = Typography;

const categoriesColumns = [
  {
    dataIndex: 'name',
    title: 'Category',
  },
  {
    dataIndex: 'ridersCount',
    title: 'Riders',
  },
  {
    dataIndex: 'grades',
    title: 'Grades automatically assigned',
    render: (text) => text.join(),
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => {
    const { id, ridersCount } = record;
    return {
      // Column configuration not to be checked
      name: id,
      disabled: !!ridersCount,
    };
  },
};

const SeasonRiderCategoriesEdit = ({ loading, categories }) => {
  const [selectedRowKeys] = useState(
    categories
      .filter((category) => category.ridersCount)
      .map((category) => category.id),
  );
  return (
    <Card title={(
      <Title level={2}>
        Rider Categories
      </Title>
    )}
    >
      <Table
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          ...rowSelection,
        }}
        loading={loading}
        scroll={{ x: true }}
        dataSource={categories}
        columns={categoriesColumns}
        title={() => <Title level={3}>Available Categories</Title>}
      />
    </Card>
  );
};
SeasonRiderCategoriesEdit.propTypes = {
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType(
      [
        PropTypes.string,
        PropTypes.number,
      ],
    ).isRequired,
    name: PropTypes.string.isRequired,
    grades: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    ridersCount: PropTypes.number.isRequired,
  })).isRequired,
};

export default SeasonRiderCategoriesEdit;
