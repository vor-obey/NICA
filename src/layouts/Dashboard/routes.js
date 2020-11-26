import { HomeOutlined } from '@ant-design/icons';
import Index from './containers/Index';
import { permissions } from '../../configs/app';

const { SUPER_ADMIN, LEAGUE_ADMIN, COACH } = permissions.roles;

const routes = [
  {
    name: 'Home',
    permissions: [SUPER_ADMIN, LEAGUE_ADMIN, COACH],
    path: '/',
    exact: true,
    component: Index,
    icon: HomeOutlined,
  },
  {
    name: 'Leagues',
    permissions: [SUPER_ADMIN],
    path: '/leagues',
    component: () => 'Leagues component',
    icon: HomeOutlined,
  },
  {
    name: 'Coaches',
    permissions: [SUPER_ADMIN, LEAGUE_ADMIN, COACH],
    path: '/coaches',
    component: () => 'Coaches component',
    icon: HomeOutlined,
  },
  {
    name: 'Licences',
    permissions: [SUPER_ADMIN, LEAGUE_ADMIN],
    path: '/licences',
    component: () => 'Licences component',
    icon: HomeOutlined,
  },
  {
    name: 'My League',
    permissions: [LEAGUE_ADMIN, COACH],
    path: '/leagues/:leagueId',
    getPathWithParams: ({ leagueId }) => `/leagues/${leagueId}`,
    component: () => 'My League component',
    icon: HomeOutlined,
  },
  {
    name: 'My Licences',
    permissions: [COACH],
    path: '/licences/:licenceId',
    getPathWithParams: ({ licenceId }) => `/licences/${licenceId}`,
    component: () => 'My Licences component',
    icon: HomeOutlined,
  },
];

export default routes;
