# Test Coverage Documentation

## Overview

This project uses [NYC (Istanbul)](https://github.com/istanbuljs/nyc) for test coverage reporting. Coverage reports are automatically generated for three types of tests:

- **Unit Tests**: Fast tests that don't require a server
- **Integration Tests**: Tests that require the Next.js server
- **E2E Tests**: End-to-end tests for complete user flows

## Configuration

Coverage is configured in `.nycrc.json`:

```json
{
  "all": true,
  "check-coverage": true,
  "lines": 80,
  "statements": 80,
  "functions": 80,
  "branches": 50,
  "include": [
    "src/lib/**/*.ts",
    "src/core/**/*.ts"
  ],
  "reporter": [
    "text",
    "html",
    "lcov",
    "json-summary"
  ],
  "report-dir": "./docs/coverage-reports"
}
```

## Running Coverage Locally

### Unit Tests
```bash
npm run test:coverage:unit
```
Reports are generated in `docs/coverage-reports/unit/`

### Integration Tests
```bash
npm run test:coverage:integration
```
Reports are generated in `docs/coverage-reports/integration/`

### E2E Tests
```bash
npm run test:coverage:e2e
```
Reports are generated in `docs/coverage-reports/e2e/`

### All Tests
```bash
npm run test:coverage:all
```
Reports are generated in `docs/coverage-reports/`

## Coverage Reports

Each coverage run generates multiple report formats:

1. **Text Report**: Displayed in the console
2. **HTML Report**: Interactive HTML viewer (`index.html`)
3. **LCOV Report**: For CI/CD integrations (`lcov.info`)
4. **JSON Summary**: Machine-readable summary (`coverage-summary.json`)

## CI/CD Integration

The GitHub Actions workflow automatically:

1. Runs all tests with coverage
2. Generates coverage reports for each test type
3. Uploads coverage artifacts
4. Updates the README.md with coverage badges
5. Commits the updated badges back to the PR branch

### Coverage Badges

Coverage badges are automatically generated and added to the README.md. The badges show:

- **Lines**: Percentage of code lines executed
- **Statements**: Percentage of statements executed
- **Functions**: Percentage of functions called
- **Branches**: Percentage of branches (if/else) taken

Badge colors:
- 🟢 Green (>=80%): Excellent coverage
- 🟡 Yellow (60-79%): Acceptable coverage
- 🟠 Orange (50-59%): Warning - needs improvement
- 🔴 Red (<50%): Critical - significant gaps

## Viewing Coverage Reports

### Locally

After running a coverage command, open the HTML report:

```bash
# Unit tests
open docs/coverage-reports/unit/index.html

# Integration tests
open docs/coverage-reports/integration/index.html

# E2E tests
open docs/coverage-reports/e2e/index.html
```

On Windows:
```bash
start docs/coverage-reports/unit/index.html
```

### In CI/CD

Coverage reports are uploaded as GitHub Actions artifacts and can be downloaded from the workflow run page.

## Coverage Thresholds

The project enforces minimum coverage thresholds (configured in `.nycrc.json`):

- Lines: 80%
- Statements: 80%
- Functions: 80%
- Branches: 50%

If coverage falls below these thresholds, the tests will fail.

## Excluded Files

The following are excluded from coverage reports:

- Test files (`**/*.spec.ts`, `**/*.test.ts`)
- Configuration files
- Build artifacts (`dist/`, `.next/`)
- Node modules
- Middleware
- App components (presentation layer)
- Controllers and infrastructure (if not tested)

## Troubleshooting

### Coverage reports not generated

1. Ensure NYC is installed: `npm install`
2. Check that `.nycrc.json` exists
3. Verify the `report-dir` path exists

### Coverage is 0% or incorrect

1. Make sure your tests are actually running code
2. Check that files are not excluded in `.nycrc.json`
3. Verify source code paths in the `include` array

### Badges not updating

1. Check GitHub Actions workflow logs
2. Ensure the script has read permissions for coverage files
3. Verify the `coverage-summary.json` files exist in artifacts

## Best Practices

1. **Write comprehensive tests**: Aim for high coverage, but focus on quality over quantity
2. **Review coverage reports**: Use the HTML report to identify untested code paths
3. **Test critical paths**: Ensure important functionality has high coverage
4. **Don't game the metrics**: Coverage is a tool, not a goal
5. **Update thresholds gradually**: As coverage improves, increase thresholds
