const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // experimentalWebKitSupport: true,
  includeShadowDom: true,
  component: {
    devServer: {
      bundler: 'webpack',
    },
    supportFile: 'cypress/support/component.ts',
  },
  e2e: {
    baseUrl: 'http://localhost:8090',
  },
});
