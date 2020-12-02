import React from 'react';
import { Link } from 'react-router-dom';
import Coaches from '../Coaches';
import LeagueTitle from '../LeagueTitle';
import LeagueAdmins from './components/LeagueAdmins';
import Permissions from '../../../../components/Permissions';
import { permissions } from '../../../../configs/app';

const { roles: ROLES } = permissions;

const tableColumns = [
  {
    key: 'name',
    title: 'UserProfile Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/coaches/${record.id}`}>{text}</Link>,
  },
  {
    ellipsis: true,
    key: 'level',
    title: 'Level',
    dataIndex: 'level',
    align: 'center',
  },
  {
    ellipsis: true,
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    ellipsis: true,
    key: 'phone',
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    ellipsis: true,
    key: 'TTCHours',
    title: 'TTC Hours',
    dataIndex: 'hours',
    width: 70,
  },
];

const SpecificLeague = () => (
  <>
    <LeagueTitle />
    <Coaches columns={tableColumns} />
    <Permissions roles={[ROLES.SUPER_ADMIN, ROLES.LEAGUE_ADMIN]}>
      <LeagueAdmins />
    </Permissions>
  </>

);

export default SpecificLeague;
