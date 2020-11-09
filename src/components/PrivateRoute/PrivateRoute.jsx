import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import checkPermissions from './helpers/checkPermissions';
import * as selectors from '../../selectors';

const PrivateRoute = ({ permissions, ...rest }) => {
  const user = useSelector(selectors.userSelector);
  if (user) {
    if (checkPermissions(user, permissions)) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Route {...rest} />;
    }
  }

  return <Redirect to="login" />;
};
PrivateRoute.propTypes = {
  permissions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({
    include: PropTypes.arrayOf(PropTypes.string),
    exclude: PropTypes.arrayOf(PropTypes.string),
  })]).isRequired,
};

PrivateRoute.defaultProps = {};

export default PrivateRoute;
