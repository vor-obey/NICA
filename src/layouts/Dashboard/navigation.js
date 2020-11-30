import {
  CrownOutlined,
  FileDoneOutlined,
  GroupOutlined, HomeOutlined,
  ProfileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { permissions } from '../../configs/app';

const { roles: ROLES } = permissions;

const navItems = [
  {
    icon: ProfileOutlined,
    to: () => '/',
    name: 'My Profile',
  },
  {
    icon: GroupOutlined,
    to: () => '/leagues',
    name: 'Leagues',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    name: 'Coaches',
    to: () => '/coaches',
    icon: TeamOutlined,
  },
  {
    name: 'Licenses',
    to: () => '/licenses',
    icon: FileDoneOutlined,
    roles: [ROLES.SUPER_ADMIN, ROLES.LEAGUE_ADMIN],
  },
  {
    name: 'My League',
    to: ({ leagueId }) => `/leagues/${leagueId}`,
    icon: CrownOutlined,
    roles: [ROLES.COACH, ROLES.LEAGUE_ADMIN],
  },
  {
    name: 'My Licenses',
    to: ({ licenseId }) => `/licenses/${licenseId}`,
    icon: HomeOutlined,
    roles: [ROLES.COACH],
  },
];

export default navItems;
