import navItems from '../../../navigation';

/**
 *
 * @param {Object} options
 * @param {String} options.role
 * @param {Object} options.params
 * @returns {{to: *}[]}
 */
const getNavItems = ({ role, params }) => (
  navItems
    .filter((item) => !item.roles || item.roles.includes(role))
    .map((item) => ({
      ...item,
      to: item.to(params),
    }))
);

export default getNavItems;
