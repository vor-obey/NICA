import { Table } from 'antd';
import React, { useCallback, useContext } from 'react';
import StepRow from './components/StepRow';
import LicenseConstructorContext from '../../api/LicenseConstructorContext';
import ACTIONS from '../../api/actions';
import LevelContext from './LevelContext';

const components = {
  body: {
    row: StepRow,
  },
};

const tableScroll = {
  x: '100%',
};

const StepsTable = ({ levelIndex, ...restProps }) => {
  const [, dispatch] = useContext(LicenseConstructorContext);
  const moveRow = useCallback(({
    drag,
    drop,
  }) => {
    dispatch({
      type: ACTIONS.MOVE_STEP,
      payload: {
        drag,
        drop,
      },
    });
  }, []);
  return (
    <LevelContext.Provider value={{ levelIndex }}>
      <Table
        components={components}
        onRow={
          (record, stepIndex) => ({
            stepIndex,
            moveRow,
            stepId: record.id,
          })
        }
        scroll={tableScroll}
        {...restProps}
      />
    </LevelContext.Provider>
  );
};

export default StepsTable;
