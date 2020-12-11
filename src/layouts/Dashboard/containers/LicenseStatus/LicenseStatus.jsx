import React from 'react';
import { gql } from '@apollo/client';
import { Skeleton } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TableWidget from '../../components/TableWidget';
import useAuthQuery from '../../../../hooks/useAuthQuery';

const resultIconS = {
  color: 'green',
  fontSize: 20,
};

const resultIconF = {
  color: 'red',
  fontSize: 20,
};

const renderIconsResult = (v) => (
  v ? <CheckCircleOutlined style={resultIconS} />
    : <CloseCircleOutlined style={resultIconF} />);

const columns = [
  {
    title: 'License Requirement',
    ellipsis: true,
    dataIndex: 'title',
    render: (text, record) => <Link to={`/licenses/0/step/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Current Status',
    ellipsis: true,
    dataIndex: 'currentStatus',
  },
  {
    title: 'License Level: 1',
    ellipsis: true,
    dataIndex: 'licenseLevel1',
    align: 'center',
    render: renderIconsResult,
  },
  {
    title: 'License Level: 2',
    ellipsis: true,
    dataIndex: 'licenseLevel2',
    align: 'center',
    render: renderIconsResult,
  },
  {
    title: 'License Level: 3',
    ellipsis: true,
    dataIndex: 'licenseLevel3',
    align: 'center',
    render: renderIconsResult,
  },
];

export const LICENSE_STEPS_QUERY = gql`
    query licenseData($licenseId: ID!){
        steps(id: $licenseId) {
            id,
            title,
            description,
            type,
            data,
            quiz,
        },
    }`;

const LicenseStatus = () => {
  const { loading, data } = useAuthQuery(LICENSE_STEPS_QUERY, {
    variables: {
      licenseId: 1,
    },
  });

  const renderBtn = () => (
    <a href="fff">
      <QuestionCircleOutlined style={{ marginRight: 10, fontSize: 18 }} />
      Learn mo about the Coaches License
    </a>
  );

  return (
    <Skeleton loading={loading} active>
      <TableWidget
        rowKey="id"
        pagination={false}
        columns={columns}
        dataSource={data?.steps}
        title="License level: 3"
        buttons={renderBtn}
      />
    </Skeleton>
  );
};

export default LicenseStatus;
