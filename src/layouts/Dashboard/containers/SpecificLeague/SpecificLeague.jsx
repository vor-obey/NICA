import React, { useMemo } from 'react';
import { Skeleton } from 'antd';
import { permissions } from '../../../../configs/app';
import LeagueForAdmin from './components/LeagueForAdmin';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import CoachLeague from './components/CoachLeague/CoachLeague';

const { roles } = permissions;

const components = {
  [roles.COACH]: CoachLeague,
  [roles.LEAGUE_ADMIN]: LeagueForAdmin,
  [roles.SUPER_ADMIN]: LeagueForAdmin,
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
