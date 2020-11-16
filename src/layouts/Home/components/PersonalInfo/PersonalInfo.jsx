import React from 'react';
import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

const PersonalInfo = ({ columns, data }) => (
  <Collapse ghost>
    <Panel header="Personal info" key="2">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Panel>
  </Collapse>
);

export default PersonalInfo;
