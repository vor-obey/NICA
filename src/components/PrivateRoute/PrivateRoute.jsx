import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { permissions } from '../../configs/app';
import useCurrentUserQuery from '../../hooks/useCurrentUserQuery';
import checkPermission from '../../utils/checkPermissions';

// If the "roles" prop are not defined, only checks authorization.
// If the "roles" prop are defined, checks authorization and access rights.

const PrivateRoute = ({ roles, ...props }) => {
  const { data, loading } = useCurrentUserQuery();

  if (loading) {
    return <Spin size="large" />;
  }

  if (data) {
    if (!roles || checkPermission(data?.user?.role, roles)) {
      return <Route {...props} />;
    }
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
};

const rolesPropType = PropTypes.arrayOf(PropTypes.oneOf(Object.values(permissions.roles)));

PrivateRoute.propTypes = {
  roles: PropTypes.oneOfType([rolesPropType, PropTypes.shape({
    include: rolesPropType,
    exclude: rolesPropType,
  })]),
};

PrivateRoute.defaultProps = {
  roles: null,
};

export default PrivateRoute;
