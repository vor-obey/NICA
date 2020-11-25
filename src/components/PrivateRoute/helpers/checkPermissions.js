/**
 *
 * @param {object} user
 * @param {string} user.role
 * @param {object | Array<string>} permissions
 * @returns {boolean|*}
 */
const checkPermissions = (user, permissions) => {
  const { role } = user;
  if (Array.isArray(permissions)) {
    return permissions.includes(role);
  }
  if ('include' in permissions) {
    return permissions.include.includes(role);
  }
  if ('exclude' in permissions) {
    return !permissions.exclude.includes((role));
  }
  return false;
};

export default checkPermissions;
