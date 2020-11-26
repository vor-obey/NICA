import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Skeleton } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import TableWidget from '../../components/TableWidget';

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
    dataIndex: 'licenseRequirement',
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
    render: renderIconsResult,
  },
  {
    title: 'License Level: 2',
    ellipsis: true,
    dataIndex: 'licenseLevel2',
    render: renderIconsResult,
  },
  {
    title: 'License Level: 3',
    ellipsis: true,
    dataIndex: 'licenseLevel3',
    render: renderIconsResult,
  },
];

const columns2 = [
  {
    title: 'Season',
    ellipsis: true,
    dataIndex: 'season',
  },
  {
    title: 'Highest Season Level',
    ellipsis: true,
    dataIndex: 'highestSeasonLevel',
  },
  {
    title: 'Highest Season Level',
    ellipsis: true,
    dataIndex: 'highestSeasonLevel',
  },
  {
    title: 'Last changed',
    ellipsis: true,
    dataIndex: 'lastChanged',
  },
  {
    title: 'Helmet delivery',
    ellipsis: true,
    dataIndex: 'helmetDelivery',
  },
  {
    title: 'Other notes',
    ellipsis: true,
    dataIndex: 'otherNotes',
  },
];

const dataSrc = [
  {
    id: 1,
    season: 2019,
    highestSeasonLevel: 2,
    lastChanged: '2017-25-10',
    helmetDelivery: 'No information',
    otherNotes: 'No information',
  },
  {
    id: 2,
    season: 2018,
    highestSeasonLevel: 3,
    lastChanged: '2018-25-10',
    helmetDelivery: 'No information',
    otherNotes: 'No information',
  },
];

export const COACH_LICENSE_QUERY = gql`
    query dashboardLicenseCoach($coachId: ID!){
        license (id: $coachId) {
            id,
            licenseRequirement,
            currentStatus,
            licenseLevel1,
            licenseLevel2,
            licenseLevel3,
        }
    }`;

const LicenseStatus = () => {
  const { data, loading } = useQuery(COACH_LICENSE_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  const renderBtn = () => (
    <a href="fff">
      <QuestionCircleOutlined style={{ marginRight: 10, fontSize: 18 }} />
      Learn mo about the Coaches License
    </a>
  );

  return (
    <>
      <Skeleton loading={loading} active>
        <TableWidget
          rowKey="id"
          pagination={false}
          columns={columns}
          dataSource={data?.license}
          title="License level: 3"
          buttons={renderBtn}
        />
      </Skeleton>

      <Skeleton loading={loading} active>
        <TableWidget
          rowKey="id"
          pagination={false}
          columns={columns2}
          dataSource={dataSrc}
          title="License level history:"
        />
      </Skeleton>
    </>
  );
};

export default LicenseStatus;
