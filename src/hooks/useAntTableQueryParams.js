import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import useQueryParams from './useQueryParams';

const SORT_KEYS = ['sort'];
const PAGINATION_KEYS = ['page', 'results'];

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
const prepareDefaultFilteredValue = ({ sort = {} }) => {
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
const parseDefaultProps = (params) => ({
  defaultPagination: prepareDefaultPagination(_.pick(params, PAGINATION_KEYS)),
  defaultFilteredValue: _.omit(params, [...PAGINATION_KEYS, ...SORT_KEYS]),
  defaultSortOrder: prepareDefaultFilteredValue(_.pick(params, SORT_KEYS)),
});

const useAntTableQueryParams = () => {
  const [params, setParams] = useQueryParams();
  const defaultProps = useMemo(() => parseDefaultProps(params), []);

  const onTableChange = useCallback((pagination, filters, sorter) => setParams({
    ...preparePagination(pagination),
    ...prepareSorter(sorter),
    ...prepareFilters(filters),
  }), []);
  return [defaultProps, onTableChange];
};

export default useAntTableQueryParams;
