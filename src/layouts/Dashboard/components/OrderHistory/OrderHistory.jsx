import React from 'react';
import {
  Collapse, Divider, Row, Table, Typography, Col, List,
} from 'antd';
import {
  CheckCircleOutlined, CreditCardOutlined, CloseCircleOutlined, CaretRightOutlined,
} from '@ant-design/icons';
import styles from '../../containers/Index/Index.module.scss';

const { Text } = Typography;
const { Panel } = Collapse;

const OrderHistory = ({ columns, orders, name }) => {
  const renderOrders = orders.map((order) => (
    <div key={order.id} style={{ marginBottom: 80 }}>
      <Divider orientation="left" style={{ color: '#1890ff' }}>
        {`Order ${order.id}`}
      </Divider>
      <Row style={{ padding: 20 }}>
        <Text>
          {`Placed on ${order.date} EDT by ${name}`}
        </Text>
      </Row>
      <Table
        columns={columns}
        dataSource={order.products}
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
                  <CaretRightOutlined style={{ marginRight: 10 }} />
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
      <Collapse ghost>
        <Panel header="Order history" key={1}>
          {renderOrders}
        </Panel>
      </Collapse>
    </>
  );
};

export default OrderHistory;
