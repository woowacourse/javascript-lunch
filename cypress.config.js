import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'ir6apx',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{spec,cy}.js',
  },
});
