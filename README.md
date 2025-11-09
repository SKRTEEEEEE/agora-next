# Agora Next - Marketplace frontend

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Test Coverage](https://img.shields.io/badge/TEST-Coverage-green?style=social)
[![Coverage: Statements](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/agora-next/main/.github/badges/coverage-statements.json)](.github/badges/coverage-statements.json)
[![Coverage: Branches](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/agora-next/main/.github/badges/coverage-branches.json)](.github/badges/coverage-branches.json)
[![Coverage: Functions](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/agora-next/main/.github/badges/coverage-functions.json)](.github/badges/coverage-functions.json)
[![Coverage: Lines](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/SKRTEEEEEE/agora-next/main/.github/badges/coverage-lines.json)](.github/badges/coverage-lines.json)

</div>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

> **Note:** This application runs on port 3002 by default to avoid conflicts with other services in the ecosystem.

## Testing

This project has a comprehensive testing setup with different types of tests. For detailed documentation, see:
- [Test Documentation](./docs/test.md)
- [Coverage Documentation](./docs/coverage.md)

### Quick Start

```bash
# Run unit tests (no server required)
npm test

# Run all tests with coverage
npm run test:coverage:all

# Run specific test types with coverage
npm run test:coverage:unit
npm run test:coverage:integration
npm run test:coverage:e2e
```

### Test Structure

- **Unit Tests** (`tests/unit/`): Fast tests that don't require a server
- **Integration Tests** (`tests/integration/`): Tests that require the Next.js server
- **E2E Tests** (`tests/e2e/`): End-to-end tests for complete user flows

### Pre-commit Hooks

The project uses Husky to run checks before commits:

1. ESLint
2. TypeScript type checking
3. Unit tests with coverage (minimum 80%)

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) format.


## 📊 Test Coverage

### Unit Tests
 ![Lines Coverage](https://img.shields.io/badge/Lines-100%25-brightgreen) ![Statements Coverage](https://img.shields.io/badge/Statements-100%25-brightgreen) ![Functions Coverage](https://img.shields.io/badge/Functions-100%25-brightgreen) ![Branches Coverage](https://img.shields.io/badge/Branches-100%25-brightgreen) 


## Docker

Build and run the application with Docker:

```bash
# Build the image
docker build -t agora-next .

# Run the container
docker run -p 3002:3002 agora-next
```

## Scripts

- `npm run dev` - Start development server (on port 3002)
- `npm run build` - Build for production
- `npm start` - Start production server (on port 3002)
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run unit tests
- `npm run test:unit:coverage` - Run unit tests with coverage
- `npm run test:integration` - Run integration tests (requires server)
- `npm run test:e2e` - Run E2E tests (requires server)
- `npm run test:all` - Run all tests
- `npm run coverage` - Generate coverage report

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
