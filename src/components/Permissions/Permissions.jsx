import PropTypes from 'prop-types';
import { permissions } from '../../configs/app';
import useCurrentUser from '../../hooks/useCurrentUser';

const Permissions = ({ roles, children }) => {
  const { data } = useCurrentUser();
  if (roles.includes(data?.user?.role)) {
    return children;
  }
  return null;
};

Permissions.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(permissions.roles))).isRequired,
};

export default Permissions;
