import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportHeight: 1024,
    viewportWidth: 768,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
