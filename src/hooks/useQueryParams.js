import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

const queryStringOptions = {
  arrayFormat: 'comma',
};

const useQueryParams = (initialState) => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [state, setState] = useState(initialState ?? queryString.parse(search, queryStringOptions));

  useEffect(() => {
    history.push({
      pathname,
      search: queryString.stringify(state, queryStringOptions),
    });
  }, [state]);

  return [state, setState];
};

export default useQueryParams;
