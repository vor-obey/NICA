import React, { useMemo } from 'react';
import { Skeleton } from 'antd';
import { permissions } from '../../../../configs/app';
import SuperAdminLeague from './components/SuperAdminLeague';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import CoachLeague from './components/CoachLeague/CoachLeague';

const { roles } = permissions;

const components = {
  [roles.COACH]: CoachLeague,
  [roles.LEAGUE_ADMIN]: () => 'League admin role specific league',
  [roles.SUPER_ADMIN]: SuperAdminLeague,
};

const SpecificLeague = () => {
  const { loading, data, error } = useCurrentUser();
  const LeagueComponent = useMemo(() => components[data?.user?.role], [data]);
  return (
    <Skeleton loading={loading} active>
      {LeagueComponent && <LeagueComponent />}
    </Skeleton>
  );
};

export default SpecificLeague;
