import { defineConfig, devices } from '@playwright/test';
import { sites } from './sites/sites';

const defaultConfig = {
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
};

console.log('Configured sites:');

for (const site of sites) {
  console.log(`  ${site.name}: ${site.baseUrl}`);
}

export default defineConfig({
  ...defaultConfig,

  projects: sites.map(site => ({
    name: site.name,

    use: {
      ...devices['Desktop Safari'],
      ...defaultConfig.use,
      baseURL: site.baseUrl,
    },
  })),
});
