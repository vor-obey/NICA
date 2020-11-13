import React from 'react';
import {
  Collapse, Divider, Table, Typography,
} from 'antd';
import { CheckCircleOutlined, NotificationOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from '../../containers/index.module.scss';

const { Paragraph, Text } = Typography;
const { Panel } = Collapse;

const OrderHistory = ({ columns, orders }) => {
  const renderOrders = orders.map((order) => (
    <div key={order.id}>
      <Divider orientation="left">
        {`Order ${order.id}`}
      </Divider>
      <Text>
        {`Placed on ${order.date} EDT by Kenny Griffin`}
      </Text>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={false}
      />
      <Paragraph className={styles.paragraphStyles}>
        <NotificationOutlined className={styles.iconNotification} />
        This your text
      </Paragraph>
      {order.paid
        ? (
          <Paragraph className={styles.paragraphStyles}>
            <CheckCircleOutlined className={styles.iconSuccess} />
            The order has been paid
          </Paragraph>
        )
        : (
          <Paragraph className={styles.paragraphStyles}>
            <CloseCircleOutlined className={styles.iconDanger} />
            The order has not been paid
          </Paragraph>
        )}
    </div>
  ));

  return (
    <>
      <Collapse ghost>
        <Panel header="Order history" key={1}>
          {renderOrders}
        </Panel>
      </Collapse>
    </>
  );
};

export default OrderHistory;
