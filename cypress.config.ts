import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/**/*.{spec,cy}.ts',
  },
});
