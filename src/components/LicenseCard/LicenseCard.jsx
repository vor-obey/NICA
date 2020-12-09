import React from 'react';
import {
  Card, Col, Image, Progress, Row, Typography,
} from 'antd';

import { QuestionOutlined } from '@ant-design/icons';
import styles from './LicenseCard.module.scss';

const { Meta } = Card;
const { Title } = Typography;

const LicenseCard = ({
  progress, level, license, access, image,
}) => {
  const renderProgress = () => (
    !access
      ? (
        <div className={styles.notAvailable}>
          <QuestionOutlined />
        </div>
      )
      : <Progress type="circle" percent={progress} width={70} status={progress !== 100 && 'exception'} />
  );

  return (
    <Card
      hoverable
      bordered={false}
      className={styles.licenseCard}
      style={{ margin: 10 }}
      cover={<Image src={image} />}
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
