import { Link, NavLink } from 'react-router-dom';
import { gql } from '@apollo/client';
import {
  Table, Row, Col, Button, Typography,
} from 'antd';
import React, { useCallback, useMemo } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './Licenses.module.scss';
import useAntTableQueryParams from '../../../../hooks/useAntTableQueryParams';
import useAuthQuery from '../../../../hooks/useAuthQuery';
import { permissions } from '../../../../configs/app';
import { checkPermission } from '../../../../components/PrivateRoute';
import useCurrentUserQuery from '../../../../hooks/useCurrentUserQuery';

const { roles: ROLES } = permissions;

const { Title } = Typography;

export const LICENSES_QUERY = gql`
    query getLicenses{
        licenses{
            id
            level
            status
            league{
                id
                name
            }
            coach{
                id
                firstName
                lastName
            }
        }
        leagues{
            id
            name
        }
    }`;

const Licenses = () => {
  const [
    { defaultPagination, defaultFilteredValue, defaultSortOrder },
    onTableChange] = useAntTableQueryParams();
  const { loading, data } = useAuthQuery(LICENSES_QUERY);
  const { data: userData } = useCurrentUserQuery();
  const renderTableTitle = useCallback(() => (
    <Row gutter={[20, 20]} justify="space-between" align="middle">
      <Col>
        <Title data-fix-margins className={styles.tableTitle}>Licenses</Title>
      </Col>
      <Col>
        <Link to="/add-license">
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            className={styles.tableFooterBtn}
          >
            create license
          </Button>
        </Link>
      </Col>
    </Row>
  ), []);

  // "license id" column
  const renderLicenseId = useCallback((value) => (
    <NavLink to={`/licenses/${value}`}>
      {`License ID: ${value}`}
    </NavLink>
  ), []);
  // "level" column
  const levelSorter = useCallback(({ level: levelA }, { level: levelB }) => levelA - levelB, []);
  // "status" column
  const statusSorter = useCallback(({ status: statusA }, { status: statusB }) => {
    if (statusA > statusB) return 1;
    if (statusA < statusB) return -1;
    return 0;
  }, []);
  // "league" column
  const leagueColFilters = useMemo(() => data?.leagues?.map(({ id, name }) => ({
    text: name,
    value: id,
  })), [data?.leagues]);
  const onFilterLeagueColHandle = useCallback((value, record) => record.league.id === value, []);
  // "actions" column
  const actionsRender = useCallback((text, record) => {
    const { status } = record;
    return (
      <Row gutter={[10, 10]}>
        {
          status === 'passed' && (
            <Col>
              <Button type="primary">Approve coach License</Button>
            </Col>
          )
        }
        <Col>
          <Button icon={<EditOutlined />} className={styles.tableFooterBtn} />
        </Col>
        <Col>
          <Button danger icon={<DeleteOutlined />} className={styles.tableFooterBtn} />
        </Col>
      </Row>
    );
  }, []);

  return (
    <Table
      sticky
      rowKey="id"
      scroll={{
        x: true,
      }}
      title={renderTableTitle}
      loading={loading}
      onChange={onTableChange}
      pagination={defaultPagination}
      dataSource={data?.licenses ?? []}
    >
      {checkPermission(userData?.user?.role, [ROLES.SUPER_ADMIN]) && (
        <Table.Column
          ellipsis
          width={150}
          dataIndex="id"
          title="License ID"
          textWrap="word-break"
          render={renderLicenseId}
        />
      )}
      <Table.Column
        ellipsis
        width={150}
        title="League"
        dataIndex="league"
        textWrap="word-break"
        render={({ name }) => name}
        defaultFilteredValue={defaultFilteredValue.league}
        filters={leagueColFilters}
        onFilter={onFilterLeagueColHandle}
      />
      <Table.Column
        ellipsis
        width={150}
        title="Level"
        dataIndex="level"
        textWrap="word-break"
        defaultSortOrder={defaultSortOrder.level}
        sorter={{
          compare: levelSorter,
          multiple: 2,
        }}
      />
      <Table.Column
        ellipsis
        width={150}
        title="Status"
        dataIndex="status"
        textWrap="word-break"
        defaultSortOrder={defaultSortOrder.status}
        sorter={{
          compare: statusSorter,
          multiple: 1,
        }}
      />
      <Table.Column
        title="Actions"
        key="Actions"
        width={150}
        render={actionsRender}
      />
    </Table>
  );
};

export default Licenses;
