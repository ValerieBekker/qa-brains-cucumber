import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  testDir: './src/tests',
  retries: 0,
  use: {
    baseURL: 'https://practice.qabrains.com/ecommerce',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
