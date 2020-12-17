/* eslint-disable react/no-array-index-key */
import React, {
  useEffect,
  useReducer,
  useCallback, useMemo,
} from 'react';
import {
  Button, Card, Space, Typography, Form, Input,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ACTIONS from './api/actions';
import licenseConstructorReducer from './api/reducer';
import styles from './LicenseConstructor.module.scss';
import LevelConstructor from './components/LevelConstructor';
import initializer, { NEW_LICENSE_KEY } from './api/initializer';
import LicenseConstructorContext from './api/LicenseConstructorContext';

const { Title, Text } = Typography;

const LicenseConstructor = ({ license, onSubmit }) => {
  const [state, dispatch] = useReducer(licenseConstructorReducer, license, initializer);
  const { levels, ...licenseInfo } = state;

  useEffect(() => {
    localStorage.setItem(NEW_LICENSE_KEY, JSON.stringify(state));
  }, [state]);

  const onSubmitHandler = useCallback((values) => {
    dispatch({
      type: ACTIONS.UPDATE_LICENSE,
      payload: {
        values,
      },
    });
  }, []);

  const onClickAddLevelBtnHandle = useCallback(() => {
    dispatch({
      type: ACTIONS.ADD_LEVEL,
    });
  }, [dispatch]);

  const onClickCreateLicenseBtnHandle = useCallback(() => {
    onSubmit(state);
  }, [onSubmit]);

  const levelsConstructors = useMemo(() => levels.map((level, index) => (
    <LevelConstructor key={index} index={index} />
  )), [levels]);

  return (
    <LicenseConstructorContext.Provider value={[
      state,
      dispatch,
    ]}
    >
      <Space
        size="large"
        direction="vertical"
        className={styles.w100}
      >
        <Card
          className={styles.cardWidget}
          title={<Title level={2}>License Info</Title>}
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
        {levelsConstructors}
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
