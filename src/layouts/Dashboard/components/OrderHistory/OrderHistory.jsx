import React from 'react';
import {
  Divider, Row, Table, Typography, Col, List,
} from 'antd';
import {
  CheckCircleOutlined, CreditCardOutlined, CloseCircleOutlined, CaretRightOutlined,
} from '@ant-design/icons';
import styles from './OrderHistory.module.scss'

const { Text } = Typography;

const orderHistoryCol = [
  {
    title: 'Product',
    width: '70%',
    dataIndex: 'name',
    key: 'product',
    fixed: 'left',
  },
  {
    title: 'Rider',
    width: '20%',
    dataIndex: 'fullName',
    key: 'reider',
    fixed: 'left',
  },
  {
    title: 'Price',
    width: '10%',
    dataIndex: 'price',
    key: 'price',
    fixed: 'left',
  },
];

const OrderHistory = ({ orders, name }) => {
  const renderOrders = orders.map((order) => (
    <div key={order.id} className={styles.orderHistoryWrap}>
      <Divider orientation="left" className={styles.dividerRight}>
        {`Order ${order.id}`}
      </Divider>
      <Row className={styles.row}>
        <Text>
          {`Placed on ${order.date} EDT by ${name}`}
        </Text>
      </Row>
      <Table
        rowKey={order.id}
        columns={orderHistoryCol}
        dataSource={order.products.map((prod) => (
          {
            name: prod.name,
            price: prod.price,
            fullName: `${prod.rider.firstName} ${prod.rider.lastName}`,
          }
        ))}
        pagination={false}
      />
      <Row className={styles.paragraphStyles}>
        <Col span={1.5}>
          <CreditCardOutlined className={styles.iconNotification} />
        </Col>
        <Col span={22.5}>
          <List
            header={`Order total: $${order.total} `}
            dataSource={order.products}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text>
                  <CaretRightOutlined className={styles.caretIcon} />
                </Typography.Text>
                {`Paid ${item.price} with Check on ${order.date}`}
              </List.Item>
            )}
          />
        </Col>
      </Row>
      {order.status === 'paid'
        ? (
          <Row className={styles.resultSuccess}>
            <CheckCircleOutlined className={styles.iconSuccess} />
            The order has been paid
          </Row>
        )
        : (
          <Row className={styles.resultDanger}>
            <CloseCircleOutlined className={styles.iconDanger} />
            The order has not been paid
          </Row>
        )}
    </div>
  ));

  return (
    <>
      { renderOrders }
    </>
  );
};

export default OrderHistory;
