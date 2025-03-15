import { defineConfig } from 'cypress';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    viewportHeight: 1000,
    experimentalStudio: true,
    baseUrl: process.env.BASE_URL ?? 'http://localhost:5173',
  },
});
