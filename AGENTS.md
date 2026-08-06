# Fluxinvoice

Fluxinvoice is a Next.js payroll and invoicing application with Stellar payments, a PostgreSQL database, and Drizzle ORM. This repository is currently a single-package pnpm workspace; verify additions against the checked-in tree rather than assuming the planned backend in `ARCHITECTURE.md` exists.

## Workflow

- Use Node.js 20 and pnpm 10.17.1. Install with `pnpm install`; CI uses `pnpm install --frozen-lockfile`.
- Verify changes in CI order: `pnpm run lint`, `pnpm exec tsc --noEmit`, `pnpm run test`, then `pnpm run build`.
- Run one test with `pnpm exec vitest run path/to/file.test.ts`; use `pnpm run test:watch` or `pnpm run test:coverage` for the other test workflows.
- Run locally with `pnpm dev`. Both `pnpm dev` and `pnpm run build` generate the ignored `public/swagger.json` through their pre-hooks; use `pnpm run swagger:generate` to run that step directly.

## Layout

- `src/app` is the Next.js App Router and `src/app/page.tsx` is the current root entrypoint.
- `src/components` contains UI, with reusable primitives in `src/components/ui`; `src/hooks`, `src/lib`, `src/utils`, and `src/types` hold shared application code.
- `src/middleware.ts` handles CORS, request tracing, API identity checks, and protection for dashboard routes and `/api/v1/*`.
- `ARCHITECTURE.md` documents a planned `src/server` service/API/database layer. Confirm those files exist before adding code that depends on it; the current tree does not contain `src/server`.

## Database

- Database tooling reads `DATABASE_URL` from the shell, `.env.local`, or `.env`; use `.env.example` for the variable inventory and never commit credentials.
- Use `pnpm run db:generate` and `pnpm run db:migrate` for durable schema changes. `pnpm run db:push` applies changes directly to the configured database.
- Available database commands are `pnpm run db:generate`, `pnpm run db:migrate`, `pnpm run db:push`, and `pnpm run db:studio`.

## Source Of Truth

- Use the scripts in `package.json`, CI in `.github/workflows/ci.yml`, TypeScript paths in `tsconfig.json`, and tool configuration files for current behavior.
- The project uses Vitest, despite older Jest/Cypress references in `.github/copilot-instructions.md`.
- Tailwind styles use the tokens in `src/styles/colors.css`; do not hand-edit generated `public/swagger.json`.
