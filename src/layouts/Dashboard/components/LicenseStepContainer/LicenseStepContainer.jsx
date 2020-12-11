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
  Skeleton,
} from 'antd';
import QUESTION_TYPE from '../../../../utils/constants';
import ScrolledTextAreaWrapper from '../../containers/ScrolledTextAreaWrapper';
import PlayerWrapper from '../../containers/PlayerWrapper';
import UploadFileWrapper from '../../containers/UploadFileWrapper';
import Quiz from '../../../../components/Quiz';

const LicenseStepContainer = memo(({ step, goNext, loading }) => {
  const [isDone, setDone] = useState(false);
  const onFinish = useCallback(() => setDone(true), []);

  useEffect(() => {
    setDone(false);
  }, [step]);

  const renderComponent = useCallback(() => {
    switch (step.type) {
      case QUESTION_TYPE.VIDEO: {
        return (
          <>
            <PlayerWrapper onFinish={onFinish} url={step?.data?.url} />
            <Row justify="end">
              <Button disabled={!isDone} style={{ marginTop: 20 }}>
                Show quiz
              </Button>
            </Row>
          </>
        );
      }
      case QUESTION_TYPE.AGREEMENT: {
        return <ScrolledTextAreaWrapper document={step.data.document} onFinish={onFinish} />;
      }
      case QUESTION_TYPE.FILE_UPLOAD: {
        return <UploadFileWrapper onFinish={onFinish} />;
      }
      default:
        return null;
    }
  }, [step, isDone]);

  return (
    <Skeleton loading={loading}>
      <Card style={{ marginBottom: 20 }}>
        <Row>
          <Col>
            <h2>{step.title}</h2>
            <h3>{step.description}</h3>
          </Col>
        </Row>
        <Row align="center">
          {renderComponent()}
        </Row>
      </Card>

      {step?.quiz && (
        <div style={{ width: '100%' }}>
          <Quiz onSubmit={() => {}} quiz={step?.quiz} />
        </div>
      )}

      <Row justify="end">
        <Button disabled={!isDone} onClick={goNext} style={{ marginTop: 20 }}>
          Next Step
        </Button>
      </Row>
    </Skeleton>
  );
});

export default LicenseStepContainer;
