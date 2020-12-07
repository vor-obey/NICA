import React from 'react';
import { Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import TableWidget from '../../components/TableWidget';
import { permissions } from '../../../../configs/app';
import styles from './Admins.module.scss';

export const LEAGUE_DASHBOARD_QUERY = gql`
    query leagueDashboard($leagueId: ID!){
        leagueDashboard(id: $leagueId) {
            id
            name
            image
            season{
                id
                name
            }
            riderRegistrationStatus
            coachRegistrationStatus
            registrationContact
            weatherPolicyLink
            coachLitmosTeam
            timeZone
            createdAt
            updatedAt
            statistics {
                title
                value
            }
            admins(role: "admin"){
                id
                firstName
                lastName
                email
            }
        },
        role,
    }
`;

const adminColumns = [
  {
    key: 'full name',
    title: 'Full name',
    ellipsis: true,
    render: (text, record) => (
      <Link
        to={`/admins/${record.id}`}
      >
        {`${record.firstName} ${record.lastName}`}
      </Link>
    ),
  },
  {
    key: 'email',
    ellipsis: true,
    dataIndex: 'email',
    title: 'E-mail address',
  },
];

const Admins = () => {
  const { data, loading } = useQuery(LEAGUE_DASHBOARD_QUERY, {
    variables: {
      leagueId: 1,
    },
  });

  const inviteAdmin = () => (
    data?.role === permissions.roles.LEAGUE_ADMIN && <Button type="link" icon={<PlusOutlined />} className={styles.fSize}>Invite Administrator</Button>
  );

  return (
    <Col span={24}>
      <TableWidget
        pagination={{ pageSize: 10 }}
        rowKey="id"
        columns={adminColumns}
        loading={loading}
        title="League admins"
        dataSource={data?.leagueDashboard?.admins}
        buttons={inviteAdmin}
      />
    </Col>
  );
};

export default Admins;
