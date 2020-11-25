import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const renderMenuItems = ({ routes, params }) => routes.map((route) => {
  const {
    name, path, getPathWithParams, icon: MenuItemIcon,
  } = route;
  const to = getPathWithParams ? getPathWithParams(params) : path;
  return (
    <Menu.Item key={to} icon={<MenuItemIcon />}>
      <Link to={to}>{name}</Link>
    </Menu.Item>
  );
});

const SiderNavBar = ({ params, routes, ...props }) => (
  <Menu {...props}>
    {
      renderMenuItems({
        routes,
        params,
      })
    }
  </Menu>
);

const routePropType = PropTypes.shape({});

SiderNavBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  params: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(routePropType).isRequired,
};

export default SiderNavBar;
