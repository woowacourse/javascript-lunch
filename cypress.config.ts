import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'u3oejp',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
  },
});
