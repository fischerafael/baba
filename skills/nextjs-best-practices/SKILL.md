---
name: nextjs-best-practices
description: Apply practical Next.js App Router best practices for architecture, rendering strategy, data fetching, routing, API boundaries, and performance; use when creating or reviewing Next.js features and project documentation.
---

# Next.js Best Practices

## Objective

Design and review Next.js codebases with strong server/client boundaries, clear routing, maintainable APIs, and good runtime performance.

## Workflow

1. Classify each feature as server-rendered, client-interactive, or mixed.
2. Keep data fetching and sensitive logic on the server when possible.
3. Isolate interactive UI into small client components.
4. Structure routes and layouts to maximize reuse and cacheability.
5. Validate with lint, typecheck, build, and feature-level sanity checks.

## Core Standards

- Prefer Server Components by default.
- Introduce `"use client"` only for interactivity/browser APIs.
- Use Route Handlers for backend endpoints and integrations.
- Prefer typed domain models and schema validation for request payloads.
- Keep UI components focused and composable.
- Use `Link`/`router` APIs for navigation instead of raw URL mutation.

## Performance Rules

- Minimize client bundle by shrinking client boundaries.
- Avoid unnecessary re-renders by colocating state.
- Keep expensive work server-side.
- Use caching/revalidation intentionally.

## Documentation Rules

- Document architecture decisions in `docs/`.
- Include troubleshooting for common App Router errors.
- Add short checklists for PR review consistency.

## References

- `references/app-router-practices.md`
