import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Card,
  Col,
  Row,
} from 'antd';
import QUESTION_TYPE from '../../../../utils/constants';
import Player from '../../../../components/Player/Player';
import UploadFile from '../../../../components/Upload/UploadFile';
import ScrolledTextArea from '../../../../components/ScrolledTextArea';

const LicenseStepContainer = memo(({ step, goNext }) => {
  const [isDone, setDone] = useState(false);
  const onFinish = useCallback(() => setDone(true), []);

  useEffect(() => {
    setDone(false);
  }, [step]);

  const renderComponent = useCallback(() => {
    switch (step.type) {
      case QUESTION_TYPE.VIDEO: {
        return <Player onFinish={onFinish} url={step.data.url} />;
      }
      case QUESTION_TYPE.AGREEMENT: {
        return <ScrolledTextArea document={step.data.document} onFinish={onFinish} />;
      }
      case QUESTION_TYPE.FILE_UPLOAD: {
        return <UploadFile />;
      }
      default:
        return null;
    }
  }, [step]);

  return (
    <Card key={step.id}>
      <Row>
        <Col>
          <h2>{step.title}</h2>
          <h3>{step.description}</h3>
        </Col>
      </Row>
      <Row>
        {renderComponent()}
      </Row>
      <Row>
        <Col align="center">
          <Button disabled={!isDone} onClick={goNext}>
            Next Step
          </Button>
        </Col>
      </Row>
    </Card>
  );
});

export default LicenseStepContainer;
