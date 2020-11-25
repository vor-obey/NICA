import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import checkPermissions from './helpers/checkPermissions';
import useCurrentUserQuery from '../../hooks/useCurrentUserQuery';

// If the permissions are not defined, only checks authorization.
// If the permissions are defined, checks authorization and access rights.

const PrivateRoute = ({ permissions, ...props }) => {
  const { data, loading } = useCurrentUserQuery();

  if (loading) {
    return <Spin size="large" />;
  }

  if (data) {
    const { user } = data;

    if (!permissions || checkPermissions(user, permissions)) {
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

PrivateRoute.propTypes = {
  permissions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({
    include: PropTypes.arrayOf(PropTypes.string),
    exclude: PropTypes.arrayOf(PropTypes.string),
  })]),
};

PrivateRoute.defaultProps = {
  permissions: null,
};

export default PrivateRoute;
