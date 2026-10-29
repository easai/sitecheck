import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage accessibility', async ({ page }, testInfo) => {
  console.log(
    `[${testInfo.project.name}] ${testInfo.project.use.baseURL}`,
  );

  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  await testInfo.attach('axe-results.json', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  expect(
    results.violations,
    `${results.violations.length} accessibility violations found`,
  ).toEqual([]);
});