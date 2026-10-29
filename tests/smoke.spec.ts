import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  console.log(
    `[${testInfo.project.name}] ${testInfo.project.use.baseURL}`,
  );
});

test('homepage loads', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('body')).toBeVisible();
});