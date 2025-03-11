import { defineConfig } from "cypress";
import localStorageCommands from "cypress-localstorage-commands/plugin.js";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      localStorageCommands(on, config);
      return config;
    },
  },
});
