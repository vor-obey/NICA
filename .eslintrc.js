module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['draftState'],
    }],
    'react/prop-types': ['off'],
    'react/jsx-props-no-spreading': 0,
    'no-unused-vars': ['warn'],
    'no-underscore-dangle': 0
  },
};
