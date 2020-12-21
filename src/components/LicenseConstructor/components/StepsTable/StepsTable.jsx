import { Table } from 'antd';
import React, { useCallback, useContext } from 'react';
import LevelContext from './LevelContext';
import StepRow from './components/StepRow';
import { moveStep } from '../../api/actionCreators';
import LicenseConstructorContext from '../../api/LicenseConstructorContext';

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

  const moveRowHandle = useCallback((options) => dispatch(moveStep(options)), []);

  const onRowHandle = useCallback((record, index) => ({
    index,
    moveRow: moveRowHandle,
    id: record.id,
  }), [moveRowHandle]);

  return (
    <LevelContext.Provider value={{ levelIndex }}>
      <Table
        onRow={onRowHandle}
        scroll={tableScroll}
        components={components}
        {...restProps}
      />
    </LevelContext.Provider>
  );
};

export default StepsTable;
