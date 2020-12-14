import React from 'react';
import { gql } from '@apollo/client';
import { Skeleton } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TableWidget from '../../components/TableWidget';
import useAuthQuery from '../../../../hooks/useAuthQuery';
import { RESPONSE_TYPE } from '../../../../utils/constants';

const resultIconS = {
  color: 'green',
  fontSize: 30,
};

const resultIconR = {
  color: 'red',
  fontSize: 30,
};

const resultIconI = {
  color: 'grey',
  fontSize: 30,
};
const resultIconP = {
  color: '#1890ff',
  fontSize: 30,
};

export const renderIconsResult = {
  [RESPONSE_TYPE.INITIAL]: <CloseCircleOutlined style={resultIconI} />,
  [RESPONSE_TYPE.PENDING]: <CloseCircleOutlined style={resultIconP} />,
  [RESPONSE_TYPE.APPROVED]: <CheckCircleOutlined style={resultIconS} />,
  [RESPONSE_TYPE.REJECTED]: <CloseCircleOutlined style={resultIconR} />,
};

const columns = [
  {
    title: 'License Requirement',
    ellipsis: true,
    dataIndex: 'title',
    render: (text, record) => (
      <Link to={`/licenses/0/step/${record.id}`}>
        {text}
      </Link>
    ),
  },
  {
    title: 'Current Status',
    ellipsis: true,
    dataIndex: 'status',
  },
  {
    title: 'License Level: 1',
    ellipsis: true,
    align: 'center',
    render: (record) => renderIconsResult[record.status],
  },
  {
    title: 'License Level: 2',
    ellipsis: true,
    align: 'center',
    render: (record) => renderIconsResult[record.status],
  },
  {
    title: 'License Level: 3',
    ellipsis: true,
    align: 'center',
    render: (record) => renderIconsResult[record.status],
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
            status,
        },
    }`;

export const LicenseStatus = () => {
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
