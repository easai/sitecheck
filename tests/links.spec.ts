import { test, expect } from '@playwright/test';

test('all internal links resolve', async ({
  page,
  request,
}, testInfo) => {
  console.log(
    `[${testInfo.project.name}] Checking links on ${testInfo.project.use.baseURL}`,
  );

  await page.goto('/');

  const links = await page.locator('a[href]').evaluateAll(
    els =>
      els.map(el =>
        (el as HTMLAnchorElement).href,
      ),
  );

  const uniqueLinks = [...new Set(links)];

  for (const link of uniqueLinks) {
    const response = await request.get(link);

    expect(
      response.status(),
      `${testInfo.project.name}: ${link}`,
    ).toBeLessThan(400);
  }
});
