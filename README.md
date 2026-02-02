# Clear Culture

## Overview

Clear Culture is a modern **Next.js App Router** project focused on building a clean, type-safe, and scalable web application using a **server-first architecture**.

The project intentionally avoids unnecessary abstraction and favors explicit architectural decisions that are easy to reason about, document, and evolve. It is designed both as a real production-ready foundation and as a learning reference for modern Next.js development.

Key goals of the project:
- Strong type safety across the entire stack
- Clear separation between server logic and UI
- Predictable project structure
- Compatibility with Vercel deployment workflows

---

## Tech Stack

### Core
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript** (strict mode)

### Backend / Data
- **Prisma ORM** as the database layer
- **PostgreSQL** (Vercel-compatible)
- **Server Actions** as the primary data mutation mechanism

### Authentication & Security
- **NextAuth (Auth.js v5 beta)**
- **Jose** for cryptographic utilities
- **bcryptjs** for password hashing

### Forms & Validation
- **React Hook Form**
- **Zod** for runtime validation
- **zod-prisma-types** for schema alignment

### Styling & UI
- **Tailwind CSS**
- **Framer Motion** for animations
- **clsx** for conditional class management

### Content & Assets
- **MDX** support for rich content
- **SVGR** for SVGs as React components

### Email
- **Resend** for transactional emails
- **@react-email/render** for email templates

---

## Project Structure

```txt
.
├─ app/                  # App Router pages, layouts, and route segments
├─ lib/                  # Shared utilities and domain logic
├─ prisma/               # Prisma schema, config, and seed scripts
│  ├─ schema.prisma
│  ├─ prisma.config.ts
│  └─ seed.ts
├─ public/               # Static assets
├─ middleware.ts         # Global middleware (auth, redirects, guards)
├─ svgr.d.ts             # SVG module type declarations
├─ next.config.mjs       # Next.js configuration
├─ tsconfig.json         # TypeScript configuration
└─ package.json
```

### Structural Principles

- **Server-first**: Database access, authentication, and sensitive logic always run on the server
- **Thin components**: UI components focus on rendering, not business logic
- **Shared logic lives in `lib/`**

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create the required environment variable files before running the project.

Minimal example:

```env
APP_URL=http://localhost:3000

DATABASE_URL=
DATABASE_URL_UNPOOLED=

AUTH_SECRET=
RESEND_API_KEY=
```

> The project is designed to work with Vercel Postgres and supports both pooled and non-pooled database connections.

### 3. Run the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Environment Variables

### Application
- `APP_URL` – Base URL of the application

### Database
- `DATABASE_URL` – Pooled PostgreSQL connection
- `DATABASE_URL_UNPOOLED` – Direct (non-pooled) connection

### Authentication
- `AUTH_SECRET` – Secret used by NextAuth

### Email
- `RESEND_API_KEY` – API key for Resend email service

> Environment variable **values** must never be committed to the repository.

---

## Scripts

| Script | Description |
|------|------------|
| `npm run dev` | Start development server with Node inspector enabled |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |

---

## Key Architectural Decisions

### Server Actions over API Routes

The project prefers **Next.js Server Actions** over traditional REST API routes.

**Reasons:**
- End-to-end type safety
- Less boilerplate
- Direct integration with App Router
- Reduced surface area for bugs

API routes should only be introduced when strictly necessary (e.g. NextAuth `GET` and `POST`).

---

### Prisma as the Single Source

- Database schema is defined in `schema.prisma`
- Types are generated automatically
- No manual SQL queries in application code

This ensures consistency between database structure and application logic.

---

### Strict TypeScript Configuration

The project runs with `strict: true` enabled.

**Goal:**
Catch bugs at compile time rather than runtime, even if it increases initial friction.

---

### Middleware Usage

Global middleware is used to:
- Apply authentication guards
- Handle redirects
- Enforce access rules

Middleware must remain lightweight, as it runs on every request.

---

## Asset Handling

### SVGs

- SVGs imported **without** `?url` are transformed into React components via SVGR
- SVGs imported **with** `?url` are treated as static assets

This behavior is configured in `next.config.mjs`.

---

### MDX

- `.mdx` files are supported
- Used for content-heavy pages where JSX + Markdown is beneficial

---

## Common Pitfalls & Notes

- Avoid using browser-only APIs in server components
- Keep server actions colocated with their usage when possible
- Middleware logic should not depend on heavy libraries
- Prisma client should never be instantiated in client components

---