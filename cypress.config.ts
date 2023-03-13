import { defineConfig } from "cypress";

const BASE_URL = "http://localhost:8080";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 375,
    viewportHeight: 812,
    baseUrl: BASE_URL,
  },
});
