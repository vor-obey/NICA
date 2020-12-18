/* eslint-disable react/no-array-index-key */
import React, {
  useRef,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  Button, Card, Typography, Form, Input, Row, Col,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createDndContext, DndProvider } from 'react-dnd';
import ACTIONS from './api/actions';
import licenseConstructorReducer from './api/reducer';
import styles from './LicenseConstructor.module.scss';
import LevelConstructor from './components/LevelConstructor';
import initializer, { NEW_LICENSE_KEY } from './api/initializer';
import LicenseConstructorContext from './api/LicenseConstructorContext';

const { Title, Text } = Typography;

const RNDContext = createDndContext(HTML5Backend);

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
    <Col span={12} key={level.id}>
      <LevelConstructor key={index} index={index} />
    </Col>
  )), [levels]);

  const manager = useRef(RNDContext);

  return (
    <LicenseConstructorContext.Provider value={[state, dispatch]}>
      <Row gutter={[10, 20]}>
        <Col span={24}>
          <Card
            className={styles.cardWidget}
            title={<Title level={2}>License Info</Title>}
          >
            <Form
              layout="vertical"
              onFinish={onSubmit}
              initialValues={licenseInfo}
              onValuesChange={onSubmitHandler}
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
        </Col>
        <DndProvider manager={manager.current.dragDropManager}>
          {levelsConstructors}
        </DndProvider>
        <Col span={24}>
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
        </Col>
        <Col span={24}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            onClick={onClickCreateLicenseBtnHandle}
          >
            Create License
          </Button>
        </Col>
      </Row>
    </LicenseConstructorContext.Provider>
  );
};

export default React.memo(LicenseConstructor);
