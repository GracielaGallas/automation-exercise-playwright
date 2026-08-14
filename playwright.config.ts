import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://automationexercise.com/', // Coloque a sua URL aqui
  },
});