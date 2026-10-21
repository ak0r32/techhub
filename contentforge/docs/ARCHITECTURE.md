# ContentForge Architecture

## Overview

ContentForge is a modular content operations platform designed for managing educational courses and standalone videos from a single database and shared content library.

## System components

- Frontend: Next.js 14 + TypeScript
- UI: Tailwind CSS + shadcn/ui-inspired primitives
- Backend: Next.js app router API routes and server actions
- Database: PostgreSQL via Supabase
- Auth: Supabase Auth
- Storage: Supabase Storage
- Analytics: Recharts for dashboard reporting
- Rich text editing: TipTap
- Forms: Zod

## Functional domains

1. Course Studio
   - courses
   - course_modules
   - lessons
   - lesson_resources
   - course_tags

2. Video Studio
   - videos
   - media_assets
   - content_versions
   - lesson_videos

3. Shared library
   - content_categories
   - tags
   - publishing_schedule
   - content_comments
   - activity_logs

4. AI assistant
   - server-side AI request layer
   - saved drafts in database only after explicit confirmation

## Relationship overview

Course -> modules -> lessons -> lesson_videos -> videos
Course -> tags
Video -> tags
Lesson -> resources
Content items -> categories
Content items -> content versions
Publishing schedule -> courses and videos

## Security model

- Auth via Supabase
- RLS enforced in Postgres
- Role-based checks on server actions and APIs
- Secret keys stored in environment variables only
- Public frontend never contains API credentials

## Deployment strategy

- App deployed on Vercel or equivalent
- Postgres and Supabase Storage managed through Supabase project
- Migrations applied via SQL scripts
- Backups scheduled through Supabase or managed Postgres provider
