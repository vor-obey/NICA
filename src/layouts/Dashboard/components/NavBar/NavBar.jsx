import React, { useMemo } from 'react';
import { Menu, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styles from './NavBar.module.scss';
import getNavItems from './helpers/getNavItems';

export const DASHBOARD_NAVBAR_QUERY = gql`
    query navParams($id: ID!){
        user(id: $id){
            id
            role
            myLeague{
                id
            }
            myLicense{
                id
            }
        }
    }`;

const reduceOptions = (data) => {
  const { user: { role, myLeague, myLicense } } = data;
  return {
    role,
    params: {
      leagueId: myLeague.id,
      licenseId: myLicense.id,
    },
  };
};

const NavBar = (props) => {
  const { data, loading } = useQuery(DASHBOARD_NAVBAR_QUERY, {
    variables: {
      id: 1,
    },
  });

  const navItems = useMemo(() => {
    if (data) return getNavItems(reduceOptions(data));
    return [];
  }, [data]);

  return (
    <Skeleton
      round
      active
      title={false}
      loading={loading}
      className={styles.skeleton}
      paragraph={{
        rows: 6,
      }}
    >
      <Menu {...props}>
        {
          navItems.map(({ icon: Icon, to, name }) => (
            <Menu.Item key={to} icon={<Icon />}>
              <Link to={to}>{name}</Link>
            </Menu.Item>
          ))
        }
      </Menu>
    </Skeleton>
  );
};

export default NavBar;
