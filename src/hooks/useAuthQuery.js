import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import RoleContext from '../roleContext';

const useAuthQuery = (...args) => {
  const { role } = useContext(RoleContext);
  const result = useQuery(...args);

  useEffect(() => {
    result.refetch();
  }, [role]);

  return result;
};

export default useAuthQuery;
