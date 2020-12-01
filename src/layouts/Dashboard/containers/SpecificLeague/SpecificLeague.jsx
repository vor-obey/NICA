import React from 'react';
import Coaches from '../Coaches';
import LeagueTitle from '../LeagueTitle';
import LeagueAdmins from './components/LeagueAdmins';
import Permissions from '../../../../components/Permissions';
import { permissions } from '../../../../configs/app';

const { roles: ROLES } = permissions;

const SpecificLeague = () => (
  <>
    <LeagueTitle />
    <Coaches />
    <Permissions roles={[ROLES.SUPER_ADMIN, ROLES.LEAGUE_ADMIN]}>
      <LeagueAdmins />
    </Permissions>
  </>

);

export default SpecificLeague;
