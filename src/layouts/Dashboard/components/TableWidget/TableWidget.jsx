import React, { useCallback } from 'react';
import {
  Button, Row, Table, Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './TableWidget.module.scss';

const { Title } = Typography;

const tableProps = {
  size: 'small',
  bordered: true,
  tableLayout: 'auto',
  scroll: { x: true },
  pagination: { pageSize: 6 },
  rowClassName: styles.tableRow,
};

const TableWidget = ({ title, ...props }) => {
  const renderTitle = useCallback(() => (
    <Row className={styles.tableTitleRow} justify="space-between" align="middle">
      <Title className={styles.tableTitle}>{title}</Title>
      <Button type="primary" icon={<PlusOutlined />} shape="circle" size="large" />
    </Row>
  ), [title]);

  return (
    <Table {...tableProps} title={renderTitle} {...props} />
  );
};

export default TableWidget;
