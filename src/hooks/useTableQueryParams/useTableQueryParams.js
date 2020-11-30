import _ from 'lodash';
import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const PAGINATION_KEYS = ['page', 'results'];
const SORT_KEYS = ['sort'];

const queryStringOptions = {
  arrayFormat: 'comma',
};

const preparePagination = (pagination) => ({
  page: pagination.current,
  results: pagination.pageSize,
});
const prepareSorter = (sorter) => {
  if (_.isArray(sorter)) {
    return {
      sort: sorter.map(({ field, order }) => `${order === 'descend' ? '-' : ''}${field}`),
    };
  }
  if (_.isEmpty(sorter) || !sorter.order) {
    return {};
  }
  return {
    sort: `${sorter.order === 'descend' ? '-' : ''}${sorter.field}`,
  };
};
const prepareFilters = (filters) => _.pickBy(filters, _.identity);

const prepareDefaultPagination = ({ page = 1, results = 10 }) => ({
  defaultCurrent: +page,
  defaultPageSize: +results,
});
const prepareDefaultFilteredValue = (sort) => {
  const mapItem = (item) => (item[0] === '-' ? { [item.slice(1)]: 'descend' } : { [item]: 'ascend' });
  if (_.isArray(sort)) {
    return sort.reduce((accumulator, item) => ({
      ...accumulator,
      ...mapItem(item),
    }), {});
  }
  if (_.isString(sort)) {
    return mapItem(sort);
  }
  return sort;
};
const parseDefaultProps = (value) => {
  const values = queryString.parse(value, queryStringOptions);
  return {
    defaultPagination: prepareDefaultPagination(_.pick(values, PAGINATION_KEYS)),
    defaultFilteredValue: _.omit(values, [...PAGINATION_KEYS, ...SORT_KEYS]),
    defaultSortOrder: prepareDefaultFilteredValue(_.pick(values, SORT_KEYS).sort),
  };
};

const useTableQueryParams = () => {
  const location = useLocation();
  const history = useHistory();
  const defaultProps = useMemo(() => parseDefaultProps(location.search), []);
  // eslint-disable-next-line no-void
  const onTableChange = useCallback((pagination, filters, sorter) => void history.push({
    pathname: location.pathname,
    search: queryString.stringify({
      ...preparePagination(pagination),
      ...prepareSorter(sorter),
      ...prepareFilters(filters),
    }, queryStringOptions),
  }), []);
  return [defaultProps, onTableChange];
};

export default useTableQueryParams;
