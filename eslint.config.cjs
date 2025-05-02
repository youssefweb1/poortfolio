const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Add your custom rules here
    },
  },
];
