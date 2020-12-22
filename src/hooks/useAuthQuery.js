import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import AuthContext from '../AuthContext';

const useAuthQuery = (...args) => {
  const { role } = useContext(AuthContext);
  const result = useQuery(...args);

  useEffect(() => {
    result.refetch();
  }, [role]);

  return result;
};

export default useAuthQuery;
