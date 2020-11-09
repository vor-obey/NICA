const checkPermissions = (user, permissions) => {
  if (Array.isArray(permissions)) {
    return permissions.includes(user.role);
  }
  if ('include' in permissions) {
    return permissions.include.includes(user.role);
  }
  if ('exclude' in permissions) {
    return !permissions.exclude.includes((user.role));
  }
  return false;
};

export default checkPermissions;
