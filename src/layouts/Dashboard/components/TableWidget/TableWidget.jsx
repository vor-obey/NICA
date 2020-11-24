import React, { useCallback, useMemo } from 'react';
import {
  Row, Table, Typography,
} from 'antd';
import styles from './TableWidget.module.scss';

const { Title } = Typography;

const tableProps = {
  size: 'small',

  tableLayout: 'auto',
  scroll: { x: true },
  pagination: { pageSize: 6 },
};

const TableWidget = ({
  title, columns, buttons, footer, ...props
}) => {
  const renderTitle = useCallback(() => (
    <Row className={styles.tableTitleRow} justify="space-between" align="middle">
      <Title level={2} className={styles.tableTitle}>{title}</Title>
      {buttons && buttons()}
    </Row>
  ), [title]);

  const columnsWithClassName = useMemo(
    () => columns.map((cn) => ({ className: styles.tableColumn, ...cn })),
    [columns],
  );

  return (
    <Table
      {...tableProps}
      title={renderTitle}
      columns={columnsWithClassName}
      footer={footer}
      {...props}
    />
  );
};

export default TableWidget;
