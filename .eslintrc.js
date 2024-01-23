module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    browser: true,
    node: true,
  },

  plugins: ['react', 'testing-library', 'jest', 'jest-dom', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': 'off',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
};
