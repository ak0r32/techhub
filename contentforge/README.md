# ContentForge

ContentForge is a production-oriented content operations platform for educational courses and video content.

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres
- Supabase Storage
- TipTap
- Zod
- TanStack Query
- Recharts

## Getting started

1. Copy `.env.example` to `.env.local` and configure Supabase and AI credentials.
2. Install dependencies:
   npm install
3. Run the app:
   npm run dev
4. Visit http://localhost:3000

## Phase 1 deliverables

- Dashboard foundation
- Shared architecture documentation
- PostgreSQL schema for core entities
- Supabase configuration stubs
- Health check route
- Secure environment configuration

## Database notes

Use the SQL in `db/schema.sql` as the primary starting point. Apply migrations manually or through your Supabase SQL editor.

## Security notes

- Never expose API keys in frontend code.
- Keep AI provider credentials in environment variables.
- Apply Row Level Security in Supabase before production use.

## Roadmap

- Phase 2: Course Studio CRUD and module management
- Phase 3: Video Studio and script editor
- Phase 4: Shared library and media management
- Phase 5: Workflow, publishing schedule, reviews, and content versions
- Phase 6: AI assistant, analytics, and deployment preparation
