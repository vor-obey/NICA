import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Table, Typography, Button,
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

const categoriesRulesColumns = [
  {
    title: 'Grade',
    dataIndex: 'grade',
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
  },
  {
    title: 'Add/Edit',
    key: 'add/edit',
    render: (v, record) => <Button type="primary" icon={<EditFilled />}>Edit</Button>,
  },
  {
    title: 'Remove',
    key: 'remove',
    render: (v, record) => <Button type="primary" icon={<DeleteFilled />}>Remove</Button>,
  },
];

const SeasonRiderCategories = ({ loading, categories, riderCategoriesAssigmentRules }) => (
  <Card title={(
    <Title level={2}>
      Rider Categories
    </Title>
  )}
  >
    <Table
      loading={loading}
      scroll={{ x: true }}
      dataSource={categories}
      columns={categoriesColumns}
      title={() => <Title level={3}>Available Categories</Title>}
    />
    <Table
      loading={loading}
      scroll={{ x: true }}
      columns={categoriesRulesColumns}
      dataSource={riderCategoriesAssigmentRules}
      title={() => <Title level={3}>Automatic Rider Category Assignment</Title>}
    />
  </Card>
);

SeasonRiderCategories.propTypes = {
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

export default SeasonRiderCategories;
