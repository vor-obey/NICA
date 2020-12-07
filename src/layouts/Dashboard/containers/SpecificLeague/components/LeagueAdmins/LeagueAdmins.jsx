import React, { useCallback } from 'react';
import {
  Row, Col, Table, Button, Typography,
} from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { permissions } from '../../../../../../configs/app';
import Permissions from '../../../../../../components/Permissions';
import useAntTableQueryParams from '../../../../../../hooks/useAntTableQueryParams';

const { roles: ROLES } = permissions;
const { Title } = Typography;

export const LEAGUE_ADMINS_QUERY = gql`
    query specificLeagueInfoForSuperAdmin($leagueId: ID!){
        league(id: $leagueId){
            id
            admins{
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

const LeagueAdmins = () => {
  const { leagueId } = useParams();
  const { data, loading } = useQuery(LEAGUE_ADMINS_QUERY, {
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
        <Title>League Admins</Title>
      </Col>
      <Col>
        <Permissions roles={[ROLES.SUPER_ADMIN]}>
          <Button icon={<PlusCircleOutlined />} type="primary">Invite League Admin</Button>
        </Permissions>
      </Col>
    </Row>
  ), []);

  return (
    <Table
      scroll={{
        x: true,
      }}
      rowKey="id"
      loading={loading}
      pagination={defaultPagination}
      title={renderAdminTableTitle}
      onChange={onChangeTableHandle}
      dataSource={data?.league?.admins}
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
  );
};

export default LeagueAdmins;
