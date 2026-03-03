---
name: nextjs-use-client
description: Diagnose and fix Next.js App Router errors related to Server vs Client Components, including "Event handlers cannot be passed to Client Component props", and guide correct use of "use client" with minimal client boundaries.
---

# Next.js Use Client

## Objective

Fix interactivity/runtime boundary issues in Next.js by applying `"use client"` only where needed and preserving Server Components elsewhere.

## Workflow

1. Find the failing component and identify browser-only features (event handlers, hooks, `window/document`, client navigation hooks).
2. Decide the smallest client boundary that resolves the issue.
3. Add `"use client"` at the top of that component file.
4. Ensure server-to-client props are serializable.
5. Prefer extracting an interactive child instead of converting a large parent tree.
6. Run project checks (`npm run lint`, `npm run typecheck`, `npm run build`) and validate the failing flow.

## Decision Rules

- Use Server Component by default for static markup, data fetching, and secure logic.
- Use Client Component when UI requires direct user interaction or browser APIs.
- Keep client components small to reduce bundle size and hydration cost.
- Replace imperative URL writes (`window.location.href`) with Next navigation APIs when possible.

## Common Fix Patterns

- Add `"use client"` to UI controls using `onClick`/`onChange`.
- Move form interactions to client component and keep data read on server.
- Pass plain JSON-friendly values across Server -> Client boundary.

## References

- `references/use-client-checklist.md`
