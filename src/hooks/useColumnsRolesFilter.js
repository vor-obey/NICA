import { useMemo } from 'react';
import { checkPermission } from '../components/PrivateRoute';
import useCurrentUserQuery from './useCurrentUserQuery';

const useColumnsPermissionsFilter = (columns) => {
  const { data } = useCurrentUserQuery();
  return useMemo(() => {
    if (data) {
      return columns.filter(({ roles }) => {
        if (roles) {
          return checkPermission(data?.user?.role, roles);
        }
        return true;
      });
    }
    return columns.filter((col) => !('roles' in col));
  }, [data]);
};

export default useColumnsPermissionsFilter;
