import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1600,
    viewportHeight: 900,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
