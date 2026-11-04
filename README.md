# SiteCheck

SiteCheck is an automated website auditing tool that validates one or more websites for availability, quality, accessibility, and user experience. It performs a collection of tests against a configurable list of websites and generates reports to help identify issues before they affect users.

## Features

- Check website availability and response status
- Verify internal and external links
- Capture page screenshots
- Scan for accessibility issues
- Validate page titles and metadata
- Detect JavaScript and console errors
- Measure basic performance metrics
- Run tests against multiple sites from a single configuration
- Generate test reports

## Installation

```bash
npm install
```

## Configuration

Define the websites to test in `sites/sites.ts`:

```ts
export const sites = [
  {
    name: "phyla",
    baseUrl: "https://phyla-easai.web.app/",
  },
  {
    name: "example",
    baseUrl: "https://example.com/",
  },
];
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test suite:

```bash
npx playwright test links.spec.ts
```

Open the Playwright report:

```bash
npx playwright show-report
```

## Available Tests

### Connection Test

Verifies that a website is reachable and responding correctly.

**Checks:**

- DNS resolution
- HTTPS availability
- HTTP status codes
- Redirect behavior
- Response failures

**Example failures:**

- Website unavailable
- Server errors (500)
- Invalid redirects
- Timeout errors

---

### Link Test

Validates links throughout the website.

**Checks:**

- Internal links
- External links
- Broken links
- Redirect chains
- Missing targets

**Example failures:**

- 404 pages
- Dead external links
- Invalid URLs

---

### Screenshot Test

Captures screenshots for visual review.

**Checks:**

- Home page rendering
- Important page layouts
- Unexpected visual changes

**Output:**

```text
screenshots/
├── phyla-home.png
└── example-home.png
```

**Useful for:**

- Visual regression testing
- Design verification
- Deployment validation

---

### Accessibility Test

Scans pages for accessibility issues.

**Checks:**

- Missing alt text
- Form labels
- Color contrast violations
- ARIA attribute problems
- Keyboard accessibility issues
- Heading structure

**Benefits:**

- Improves usability
- Supports accessibility compliance
- Identifies barriers for assistive technology users

---

### Console Error Test

Monitors browser console output during page load.

**Checks:**

- JavaScript exceptions
- Failed resource requests
- Runtime errors
- Warning messages

**Example issues:**

```text
Uncaught TypeError
Failed to load resource
ReferenceError
```

---

### Metadata Test

Validates important page metadata.

**Checks:**

- Page title
- Meta description
- Canonical URL
- Open Graph metadata
- Missing SEO elements

**Example issues:**

- Missing title
- Empty description
- Duplicate metadata

---

### Performance Test

Measures basic page performance indicators.

**Checks:**

- Load times
- First content render
- Large assets
- Slow responses

**Helps identify:**

- Slow pages
- Oversized resources
- Bottlenecks affecting user experience

## Reports

After execution, SiteCheck generates reports containing:

- Passed and failed tests
- Accessibility findings
- Link validation results
- Screenshots
- Console errors
- Performance metrics

Reports can be used for:

- Quality assurance
- Deployment verification
- Ongoing site monitoring
- Accessibility reviews

## Typical Workflow

1. Configure websites in `sites/sites.ts`
2. Run SiteCheck
3. Review generated reports
4. Fix identified issues
5. Re-run tests until all checks pass

## Example

```bash
sitecheck
```

Expected output:

```text
✓ phyla - Connection Test
✓ phyla - Link Test
✓ phyla - Accessibility Test
✓ phyla - Screenshot Test
✓ phyla - Metadata Test
✓ phyla - Console Error Test
✓ phyla - Performance Test

All checks completed successfully.
```

## License

MIT License.
