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
import { LICENSE_LEVEL_STEP_TYPE } from '../../../../utils/constants';
import ScrolledTextAreaWrapper from '../../containers/ScrolledTextAreaWrapper';
import PlayerWrapper from '../../containers/PlayerWrapper';
import UploadFileWrapper from '../../containers/UploadFileWrapper';
import Quiz from '../../../../components/Quiz';

const LicenseStepContainer = memo(({ step, goNext, loading }) => {
  const [isDone, setDone] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [visible, setVisible] = useState(false);
  const onFinish = useCallback(() => setDone(true), []);
  const activeQuizBtn = useCallback(() => setViewed(true), []);
  const showQuiz = useCallback(() => setVisible(true), []);

  useEffect(() => {
    setDone(false);
  }, [step]);

  const renderComponent = useCallback(() => {
    switch (step.type) {
      case LICENSE_LEVEL_STEP_TYPE.VIDEO: {
        return (
          <>
            <PlayerWrapper onFinish={activeQuizBtn} url={step?.data?.url} />
            <Row>
              <Button disabled={!viewed} onClick={showQuiz} style={{ marginTop: 20 }}>
                Show quiz
              </Button>
            </Row>
          </>
        );
      }
      case LICENSE_LEVEL_STEP_TYPE.AGREEMENT: {
        return <ScrolledTextAreaWrapper document={step.data.document} onFinish={onFinish} />;
      }
      case LICENSE_LEVEL_STEP_TYPE.FILE_UPLOAD: {
        return <UploadFileWrapper onFinish={onFinish} />;
      }
      default:
        return null;
    }
  }, [step, isDone, viewed, visible]);

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

      {step?.quiz && visible && (
        <div style={{ width: '100%' }}>
          <Quiz onSubmit={onFinish} quiz={step?.quiz} />
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
