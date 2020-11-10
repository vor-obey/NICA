import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import checkPermissions from './helpers/checkPermissions';
import * as selectors from '../../selectors';

const PrivateRoute = ({ permissions, ...rest }) => {
  const history = useHistory();
  const user = useSelector(selectors.userSelector);

  if (!user) {
    return <Redirect to="/login" />;
  }
  if (permissions && !checkPermissions(user, permissions)) {
    history.goBack();
    return null;
  }
  return <Route {...rest} />;
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
