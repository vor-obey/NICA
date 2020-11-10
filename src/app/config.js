const config = {
  api: {
    baseURL: 'http://localhost:5000/api',
    users: {
      allowedParams: ['role'],
    },
  },
  permissions: {
    roles: {
      admin: 'admin',
      coach: 'coach',
      rider: 'rider',
    },
  },
};

export default config;
