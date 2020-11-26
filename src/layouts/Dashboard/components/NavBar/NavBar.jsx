import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import useNavItems from '../../../../hooks/useNavItems';

const NavBar = (props) => {
  const navItems = useNavItems();
  return (
    <Menu {...props}>
      {
        navItems.map(({ icon: Icon, to, name }) => (
          <Menu.Item key={to} icon={<Icon />}>
            <Link to={to}>{name}</Link>
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

export default NavBar;
