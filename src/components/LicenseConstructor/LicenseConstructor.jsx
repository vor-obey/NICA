/* eslint-disable react/no-array-index-key */
import _ from 'lodash';
import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  Button, Card, Space, Typography, Row, Col, Descriptions, Form, Input, Modal,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import ACTIONS from './api/actions';
import licenseConstructorReducer from './api/reducer';
import styles from './LicenseConstructor.module.scss';
import LevelConstructor from './components/LevelConstructor';
import initializer, { NEW_LICENSE_KEY } from './api/initializer';
import LicenseConstructorContext from './api/LicenseConstructorContext';

const { Title, Text } = Typography;

const LicenseConstructor = ({ license, onSubmit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [state, dispatch] = useReducer(licenseConstructorReducer, license, initializer);
  const { levels, ...licenseInfo } = state;
  useEffect(() => {
    localStorage.setItem(NEW_LICENSE_KEY, JSON.stringify(state));
  }, [state]);

  const onClickAddLevelBtnHandle = useCallback(() => {
    dispatch({
      type: ACTIONS.ADD_LEVEL_TO_LICENSE,
    });
  }, [dispatch]);

  const onClickCreateLicenseBtnHandle = useCallback(() => {
    onSubmit(state);
  }, [onSubmit]);

  const onSubmitHandler = useCallback((values) => {
    dispatch({
      type: ACTIONS.LICENSE_INFO_CHANGE,
      payload: {
        values,
      },
    });
  }, []);

  return (
    <LicenseConstructorContext.Provider value={[
      state,
      dispatch,
    ]}
    >
      <Space direction="vertical" className={styles.w100} size="large">
        <Card
          className={styles.cardWidget}
          title={(
            <Row justify="space-between">
              <Col>
                <Title level={2}>License Info</Title>
              </Col>
              <Col>
                <Button
                  size="large"
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setIsEdit(true)}
                />
              </Col>
            </Row>
          )}
        >
          <Form
            onFinish={onSubmit}
            layout="vertical"
            onValuesChange={onSubmitHandler}
            initialValues={licenseInfo}
          >
            <Form.Item
              name="title"
              rules={[{
                required: true,
                message: 'Missing title',
              }]}
              label={<Text strong>License title</Text>}
            >
              <Input placeholder="license title.." />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{
                required: true,
                message: 'Missing description',
              }]}
              label={<Text strong>License description</Text>}
            >
              <Input.TextArea placeholder="license description.." />
            </Form.Item>
          </Form>
        </Card>
        {
          levels.map((level, index) => (
            <LevelConstructor
              key={index}
              index={index}
            />
          ))
        }
        <Button
          ghost
          block
          size="large"
          type="primary"
          icon={<PlusOutlined />}
          style={{
            borderStyle: 'dashed',
          }}
          onClick={onClickAddLevelBtnHandle}
        >
          Add Level
        </Button>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          onClick={onClickCreateLicenseBtnHandle}
        >
          Create License
        </Button>
      </Space>
    </LicenseConstructorContext.Provider>
  );
};

export default LicenseConstructor;
