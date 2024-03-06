import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: ['cypress/e2e/**/*.cy.{js,ts}', 'cypress/unit/**/*.cy.{js,ts}'],
    setupNodeEvents(on, config) {},
    supportFile: false,
  },
});
