import React from 'react';
import {
  Card, Col, Image, Progress, Row, Typography,
} from 'antd';

import { QuestionOutlined } from '@ant-design/icons';
import styles from './LicenseCard.module.scss';

const { Meta } = Card;
const { Title } = Typography;

const LicenseCard = ({
  progress, level, license, access, image, step,
}) => {
  const renderProgress = () => (
    <Progress type="circle" percent={progress} width={70} status={progress !== 100 && 'exception'} format={() => <div style={{ fontSize: 25 }}>{step}</div>} />
  );

  return (
    <Card
      hoverable
      bordered={false}
      className={styles.licenseCard}
      style={{ margin: 10 }}
      cover={<Image src={image} style={{ padding: 1 }} />}
    >
      <Row className={styles.progress}>
        <Progress percent={progress} status="active" />
      </Row>

      <Row align="middle">
        <Col span={16}>
          <Meta
            title={(
              <Title level={3}>
                {`License ${level}`}
              </Title>
            )}
            description={license}
          />
        </Col>
        <Col span={8} align="center">
          {renderProgress()}
        </Col>
      </Row>

    </Card>
  );
};

export default LicenseCard;
