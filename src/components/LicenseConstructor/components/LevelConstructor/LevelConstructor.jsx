import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import {
  Button, Card, Typography, Table, Row, Col, Space, Divider,
} from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import ACTIONS from '../../api/actions';
import StepsConstructor from '../StepConstructor';
import LevelInfoForm from '../forms/LevelInfoForm';
import styles from '../../LicenseConstructor.module.scss';
import { LICENSE_LEVEL_STEP_TYPE } from '../../../../utils/constants';
import LicenseConstructorContext from '../../api/LicenseConstructorContext';

const { Title, Text, Paragraph } = Typography;

const stepTypeTitles = {
  [LICENSE_LEVEL_STEP_TYPE.FILE_UPLOAD]: 'File uploading',
  [LICENSE_LEVEL_STEP_TYPE.VIDEO]: 'video watching',
  [LICENSE_LEVEL_STEP_TYPE.AGREEMENT]: 'license agreement',
};

const LevelConstructor = ({
  index,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [state, dispatch] = useContext(LicenseConstructorContext);
  const {
    steps, title, description, ...level
  } = useMemo(() => state.levels[index], [state, index]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createStep = useCallback((values) => {
    const action = {
      type: ACTIONS.ADD_STEP,
      payload: {
        levelIndex: index,
        values,
      },
    };
    dispatch(action);
    setIsModalVisible(false);
  }, [dispatch]);
  const onClickAddStepBtnHandle = useCallback(() => {
    setIsModalVisible(true);
  }, [setIsModalVisible]);
  const onClickRemoveBtnHandle = useCallback(() => {
    dispatch({
      type: ACTIONS.REMOVE_LEVEL,
      payload: index,
    });
  }, [dispatch]);
  const onCancelStepConstructorHandle = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  const removeStep = useCallback((stepIndex) => {
    const action = {
      type: ACTIONS.REMOVE_STEP,
      payload: {
        levelIndex: index,
        stepIndex,
      },
    };
    dispatch(action);
  }, [dispatch]);

  const stepsColumns = useMemo(() => [
    {
      title: 'Step',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text) => stepTypeTitles[text],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, stepIndex) => (
        <Row gutter={20}>
          <Col>
            <Button
              ghost
              type="primary"
              icon={<EditOutlined />}
            />
          </Col>
          <Col>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeStep(stepIndex)}
            />
          </Col>
        </Row>
      ),
    },
  ], []);

  const onCancelLevelInfoFormHandle = useCallback(() => {
    setIsEdit(false);
  }, [setIsEdit]);

  const onSubmitLevelInfoFormHandle = useCallback((values) => {
    dispatch({
      type: ACTIONS.UPDATE_LEVEL,
      payload: {
        levelIndex: index,
        values,
      },
    });
    setIsEdit(false);
  }, [dispatch, setIsEdit]);

  const renderStepsTableFooter = useCallback(() => (
    <Button
      block
      ghost
      type="primary"
      icon={<PlusOutlined />}
      style={{
        borderStyle: 'dashed',
      }}
      onClick={onClickAddStepBtnHandle}
    >
      Add Step
    </Button>
  ), [onClickAddStepBtnHandle]);

  const onClickEditBtnHandle = useCallback(() => setIsEdit(true), [setIsEdit]);

  return (
    <Card
      className={styles.cardWidget}
      title={(
        <Row justify="space-between" align="middle">
          <Col>
            <Title style={{ margin: 0 }} level={3}>{`Level #${index + 1}. ${title}`}</Title>
          </Col>
          <Col>
            <Space>
              <Button
                danger
                size="large"
                icon={<DeleteOutlined />}
                onClick={onClickRemoveBtnHandle}
              />
              <Button
                size="large"
                type="primary"
                icon={<EditOutlined />}
                onClick={onClickEditBtnHandle}
              />
            </Space>
          </Col>
        </Row>
      )}
    >
      <Row>
        <Title level={4}>Description:</Title>
      </Row>
      <Row>
        <Paragraph>
          {description}
        </Paragraph>
      </Row>
      <Divider />
      <LevelInfoForm
        visible={isEdit}
        onCancel={onCancelLevelInfoFormHandle}
        onSubmit={onSubmitLevelInfoFormHandle}
        initialValues={level}
      />
      <Title level={4}>Level Steps</Title>
      <Table
        pagination={null}
        dataSource={steps}
        columns={stepsColumns}
        footer={renderStepsTableFooter}
      />
      <StepsConstructor
        onSubmit={createStep}
        visible={isModalVisible}
        onCancel={onCancelStepConstructorHandle}
      />
    </Card>
  );
};

export default LevelConstructor;
