/**
 *
 * @param {string} role
 * @param {Array<string>} roles
 * @returns {boolean}
 */
const checkPermissions = (role, roles) => {
  if (Array.isArray(roles)) {
    return roles.includes(role);
  }
  if ('include' in roles && Array.isArray(roles.include)) {
    return roles.include.includes(role);
  }
  if ('exclude' in roles && Array.isArray(roles.exclude)) {
    return !roles.exclude.includes(role);
  }
  return false;
};

export default checkPermissions;
