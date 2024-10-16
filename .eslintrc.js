module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Enables JSX parsing
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      files: ['*.test.tsx'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'testing-library/no-wait-for-multiple-assertions': 'off',
        'jest/valid-expect': 'off',
      },
    },
  ],
};
