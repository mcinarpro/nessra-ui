---
description: Run tests with optional watch mode or coverage
argument-hint: [watch|coverage|<pattern>] (optional)
allowed-tools: Bash(pnpm test:*), Bash(pnpm test:watch:*), Bash(pnpm test:coverage:*), Bash(pnpm vitest:*), Bash(find:*)
---

## Context

- Test files: !`find . -name "*.test.ts" -o -name "*.test.tsx" 2>/dev/null | head -10`

## Task

Run the test suite.

### Modes

Based on `$ARGUMENTS`:

- **(no argument)**: Run all tests once
  ```bash
  pnpm test
  ```

- **watch**: Run in watch mode for development
  ```bash
  pnpm test:watch
  ```

- **coverage**: Run with coverage report
  ```bash
  pnpm test:coverage
  ```

- **<pattern>**: Run tests matching pattern
  ```bash
  pnpm vitest run $ARGUMENTS
  ```

### On failure

1. Show which tests failed
2. Display the error message
3. Suggest potential fixes based on the error
