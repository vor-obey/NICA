import React, {
  useCallback, useContext, useLayoutEffect, useMemo, useState,
} from 'react';
import {
  Button, Card, Typography, Row, Col, Space,
} from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import ACTIONS from '../../api/actions';
import StepForm from '../forms/StepForm';
import LevelInfoForm from '../forms/LevelInfoForm';
import styles from '../../LicenseConstructor.module.scss';
import { LICENSE_LEVEL_STEP_TYPE } from '../../../../utils/constants';
import LicenseConstructorContext from '../../api/LicenseConstructorContext';
import StepsTable from '../StepsTable';
import * as actionCreators from '../../api/actionCreators';

const { Title } = Typography;

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
  const [editStepIndex, setEditStepIndex] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onClickAddStepBtnHandle = useCallback(() => {
    dispatch(actionCreators.addStep(index));
    setEditStepIndex(steps.length);
  }, [setIsModalVisible]);
  const onClickRemoveBtnHandle = useCallback(() => {
    dispatch(actionCreators.removeLevel(index));
  }, [dispatch]);
  const onCancelStepConstructorHandle = useCallback(() => {
    setEditStepIndex(-1);
  }, [setIsModalVisible]);

  useLayoutEffect(() => {
    // eslint-disable-next-line no-bitwise
    if (~editStepIndex) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [editStepIndex]);

  const removeStep = useCallback((stepIndex) => {
    dispatch(actionCreators.removeStep(index, stepIndex));
  }, [dispatch]);

  const stepsColumns = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: 'Step',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text) => stepTypeTitles[text],
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'videoURL',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, stepIndex) => (
        <Row gutter={[20, 10]} wrap={false}>
          <Col>
            <Button
              ghost
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setEditStepIndex(stepIndex);
              }}
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
    dispatch(actionCreators.updateLevel(index, values));
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
            <Title style={{ margin: 0 }} level={3}>{`${index + 1}. ${title}`}</Title>
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
      {/*
       <Row>
       <Col span={24}>
       <Title style={{ margin: 0 }} level={4}>Description:</Title>
       </Col>
       <Col span={24}>
       <Paragraph>
       {description}
       </Paragraph>
       </Col>
       </Row>
       */}
      <LevelInfoForm
        visible={isEdit}
        initialValues={level}
        onCancel={onCancelLevelInfoFormHandle}
        onSubmit={onSubmitLevelInfoFormHandle}
      />

      <StepsTable
        title={() => <Title level={4}>Steps</Title>}
        rowKey="id"
        levelIndex={index}
        pagination={false}
        dataSource={steps}
        columns={stepsColumns}
        footer={renderStepsTableFooter}
      />
      <StepForm
        initialValues={steps[editStepIndex]}
        onSubmit={(values) => {
          dispatch(actionCreators.updateStep(index, editStepIndex, values));
          setEditStepIndex(-1);
        }}
        visible={isModalVisible}
        onCancel={onCancelStepConstructorHandle}
      />
    </Card>
  );
};

export default React.memo(LevelConstructor);
