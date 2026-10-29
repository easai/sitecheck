import { test, expect } from '@playwright/test';

test('homepage visual', async ({ page }, testInfo) => {
  console.log(
    `[${testInfo.project.name}] ${testInfo.project.use.baseURL}`,
  );

  await page.goto('/');

  await expect(page).toHaveScreenshot(
    `${testInfo.project.name}-homepage.png`,
  );
});