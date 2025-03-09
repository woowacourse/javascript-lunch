import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1536,
    viewportHeight: 960,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
