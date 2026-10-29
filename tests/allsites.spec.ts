import { test, expect } from "@playwright/test";

const SITES = [
  "https://phyla-easai.web.app/",
  "https://med-easai.web.app/",
  "https://biology-easai.web.app/",
  "https://elisp-easai-home.web.app/",
];

const SKIP_EXTENSIONS =
  /\.(gif|png|jpg|jpeg|webp|svg|pdf|rm)$/i;

async function crawlSite(page: any, baseUrl: string) {
  const visited = new Set<string>();
  const queued = new Set<string>([baseUrl]);
  const queue = [baseUrl];

  const failures: string[] = [];

  while (queue.length) {
    const url = queue.shift()!;

    if (visited.has(url)) {
      continue;
    }

    visited.add(url);

    console.log(`Checking ${url}`);

    const response = await page.goto(url, {
      waitUntil: "networkidle",
    });

    if (!response?.ok()) {
      failures.push(
        `${url}: HTTP ${response?.status()}`
      );
      continue;
    }

    const title = await page.title();

    const text = (
      await page.locator("body").innerText()
    )
      .replace(/\s+/g, " ")
      .trim();

    const headingCount = await page
      .locator("h1,h2,h3,h4,h5,h6")
      .count();

    if (!title) {
      failures.push(`${url}: missing title`);
    }

    if (text.length < 100) {
      failures.push(
        `${url}: only ${text.length} visible characters`
      );
    }

    if (headingCount === 0 && text.length < 500) {
      failures.push(`${url}: no headings found`);
    }

    const links = await page.$$eval(
      "a[href]",
      anchors =>
        anchors.map(
          a =>
            (a as HTMLAnchorElement).href
              .split("#")[0]
        )
    );

    for (const link of links) {
      if (
        !link.startsWith(baseUrl) ||
        SKIP_EXTENSIONS.test(link) ||
        visited.has(link) ||
        queued.has(link)
      ) {
        continue;
      }

      queued.add(link);
      queue.push(link);
    }
  }

  console.log(
    `${baseUrl}: visited ${visited.size} pages`
  );

  return failures;
}

test.setTimeout(120_000);

test("all pages contain human-readable content", async ({ page }) => {
  const failures: string[] = [];

  for (const site of SITES) {
    console.log(`Testing ${site}`);

    failures.push(
      ...(await crawlSite(page, site))
    );
  }

  expect(
    failures,
    failures.join("\n")
  ).toEqual([]);
});
