import React from 'react';
import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

// eslint-disable-next-line consistent-return
const PersonalInfo = ({ columns, data }) => {
  if (!data) {
    return null;
  }
  const { firstName: name, email, lastName } = data;
  const { timeZone, city } = data.address;

  return (
    <Collapse ghost>
      <Panel header="Personal info" key="2">
        <Table
          columns={columns}
          dataSource={[{
            email, name, lastName, timeZone, city,
          }]}
          pagination={false}
        />
      </Panel>
    </Collapse>
  );
};

export default PersonalInfo;
