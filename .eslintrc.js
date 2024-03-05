module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],

  // (포매터)
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-depth': ['error', 1],
    'max-lines-per-function': ['warn', { max: 15 }],
  },
};
