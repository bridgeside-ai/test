# bridgeside-smoke-tests

E2E smoke tests for bridgeside.ai marketing pages and core flows.

## Setup

```bash
npm install
npx playwright install chromium --with-deps
```

## Run

```bash
# All tests
npm test

# UI mode
npm run test:ui
```

## CI

Tests run automatically via `.github/workflows/smoke-tests.yml` after the infra pipeline completes a terraform apply on the `test` branch. The workflow is triggered via repository dispatch from the infra repo.

## Tests

- **marketing.spec.js** — Landing page, hero, pricing cards, FAQ, features, footer links
- Additional test files are added as integration expands