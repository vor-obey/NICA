import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ permissions, ...rest }) => <Route {...rest} />;

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
