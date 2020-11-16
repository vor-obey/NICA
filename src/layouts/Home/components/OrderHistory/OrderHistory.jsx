import React from 'react';
import {
  Collapse, Divider, Row, Table, Typography, Col, List,
} from 'antd';
import {
  CheckCircleOutlined, CreditCardOutlined, CloseCircleOutlined, CaretRightOutlined,
} from '@ant-design/icons';
import styles from '../../containers/index.module.scss';

const { Text } = Typography;
const { Panel } = Collapse;

const paidData = [
  'Paid $110.00 with Check on 2016-09-22 12:35:29 EDT',
  'Paid $400.00 with Check on 2016-09-22 12:55:29 EDT',
  'Paid $130.00 with Check on 2016-09-22 12:45:29 EDT',
];

const OrderHistory = ({ columns, orders }) => {
  const renderOrders = orders.map((order) => (
    <div key={order.id} style={{ marginBottom: 80 }}>
      <Divider orientation="left" style={{ color: '#1890ff' }}>
        {`Order ${order.id}`}
      </Divider>
      <Row style={{ padding: 20 }}>
        <Text>
          {`Placed on ${order.date} EDT by Kenny Griffin`}
        </Text>
      </Row>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={false}
      />
      <Row className={styles.paragraphStyles}>
        <Col span={1.5}>
          <CreditCardOutlined className={styles.iconNotification} />
        </Col>
        <Col span={22.5}>
          <List
            header="Order total: $640.00"
            dataSource={paidData}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text>
                  <CaretRightOutlined style={{ marginRight: 10 }} />
                </Typography.Text>
                {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
      {order.paid
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
      <Collapse ghost>
        <Panel header="Order history" key={1}>
          {renderOrders}
        </Panel>
      </Collapse>
    </>
  );
};

export default OrderHistory;
