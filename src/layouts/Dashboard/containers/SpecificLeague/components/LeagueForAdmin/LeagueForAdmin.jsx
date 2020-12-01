import {
  Row, Col, Table, Button, Typography,
} from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import PageTitle from '../../../../components/PageTitle';
import useAntTableQueryParams from '../../../../../../hooks/useAntTableQueryParams';
import Statistics from '../../../../components/Statistics';

const { Title } = Typography;

export const ADMIN_LEAGUE = gql`
    query specificLeagueInfoForSuperAdmin($leagueId: ID!){
        league(id: $leagueId){
            id
            name
            image
            season
            statistics{
                title
                value
            }
            users{
                id
                firstName
                lastName
                email
                phone
                role
            }
        }
    }
`;

const alphabetSort = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

const LeagueForAdmin = () => {
  const { leagueId, adminId } = useParams();
  const { data, loading } = useQuery(ADMIN_LEAGUE, {
    variables: {
      leagueId: 'superAdminLeagueId',
    },
  });

  const [
    { defaultSortOrder, defaultPagination },
    onChangeTableHandle] = useAntTableQueryParams();

  const renderAdminTableTitle = useCallback(() => (
    <Row justify="space-between" align="middle">
      <Col>
        <Title style={{ margin: 0 }}>League Admins</Title>
      </Col>
      <Col>
        <Button icon={<PlusCircleOutlined />} type="primary">Invite League Admin</Button>
      </Col>
    </Row>
  ), []);

  return (
    <Row gutter={[0, 60]}>
      <Col span={24}>
        <PageTitle
          loading={loading}
          avatar={data?.league?.image}
          pagination={defaultPagination}
          title={data?.league?.name?.short ?? 'League name'}
          description={`Season ${data?.league?.season?.name}`}
        />
      </Col>
      <Col span={24}>
        <Statistics statistics={data?.league?.statistics ?? []} loading={loading} />
      </Col>
      <Col span={24}>
        <Table
          scroll={{
            x: true,
          }}
          rowKey="id"
          loading={loading}
          title={renderAdminTableTitle}
          onChange={onChangeTableHandle}
          dataSource={data?.league?.users}
        >
          <Table.Column
            title="ID"
            dataIndex="id"
            defaultSortOrder={defaultSortOrder.id}
            sorter={{
              compare: ({ id: a }, { id: b }) => alphabetSort(a, b),
              multiple: 5,
            }}
            render={(value) => (
              <Link to={`/profiles/${value}`}>
                {`Admin id: ${value}`}
              </Link>
            )}
          />
          <Table.Column
            title="First name"
            dataIndex="firstName"
            defaultSortOrder={defaultSortOrder.firstName}
            sorter={{
              compare: ({ firstName: a }, { firstName: b }) => alphabetSort(a, b),
              multiple: 4,
            }}
          />
          <Table.Column
            title="Last name"
            dataIndex="lastName"
            defaultSortOrder={defaultSortOrder.lastName}
            sorter={{
              compare: ({ lastName: a }, { lastName: b }) => alphabetSort(a, b),
              multiple: 3,
            }}
          />
          <Table.Column
            dataIndex="email"
            title="E-mail address"
            defaultSortOrder={defaultSortOrder.email}
            sorter={{
              compare: ({ email: a }, { email: b }) => alphabetSort(a, b),
              multiple: 2,
            }}
          />
          <Table.Column
            dataIndex="phone"
            title="Phone number"
            defaultSortOrder={defaultSortOrder.phone}
            sorter={{
              compare: ({ phone: a }, { phone: b }) => alphabetSort(a, b),
              multiple: 1,
            }}
          />
          <Table.Column
            title="Profile"
            render={(text, { id }) => (
              <Link to={`/leagues/${leagueId}/admins/${id}`}>
                View profile
              </Link>
            )}
          />
          <Table.Column
            key="actions"
            title="Actions"
            render={() => (
              <Row gutter={[10, 10]}>
                <Col>
                  <Button icon={<MinusCircleOutlined />} danger>Deactivate admin</Button>
                </Col>
              </Row>
            )}
          />
        </Table>
      </Col>
    </Row>
  );
};

export default LeagueForAdmin;
