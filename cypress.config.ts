import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportHeight: 1000,
    experimentalStudio: true,
  },
});
