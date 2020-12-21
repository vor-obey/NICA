import React, {
  useRef,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  Row, Col, Button, Card, Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createDndContext, DndProvider } from 'react-dnd';
import licenseConstructorReducer from './api/reducer';
import styles from './LicenseConstructor.module.scss';
import * as actionCreators from './api/actionCreators';
import LevelConstructor from './components/LevelConstructor';
import LicenseInfoForm from './components/forms/LicenseInfoForm';
import initializer, { LICENSE_KEY } from './api/initializer';
import LicenseConstructorContext from './api/LicenseConstructorContext';

const { Title } = Typography;

const RNDContext = createDndContext(HTML5Backend);

const LicenseConstructor = ({ license, onSubmit }) => {
  const [state, dispatch] = useReducer(licenseConstructorReducer, license, initializer);
  const { levels, ...licenseInfo } = state;

  useEffect(() => {
    localStorage.setItem(LICENSE_KEY, JSON.stringify(state));
  }, [state]);

  const onChangeLicenseInfoFormHandle = useCallback((changedValues) => {
    dispatch(actionCreators.updateLicense(changedValues));
  }, []);

  const onClickAddLevelBtnHandle = useCallback(() => {
    dispatch(actionCreators.addLevel());
  }, [dispatch]);

  const onClickCreateLicenseBtnHandle = useCallback(() => {
    onSubmit(state);
  }, [onSubmit]);

  const levelsConstructors = useMemo(() => levels.map((level, index) => (
    <Col key={level.id} span={12}>
      <LevelConstructor index={index} />
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
            <LicenseInfoForm onChange={onChangeLicenseInfoFormHandle} initialValues={licenseInfo} />
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
