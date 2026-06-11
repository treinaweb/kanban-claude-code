# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js, port 3000)
npm run build    # production build
npm run start    # serve production build
```

There are no test or lint scripts configured.

**Required environment variables** (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Architecture

Multi-page Next.js 15 app (App Router) — one kanban board with three fixed columns (todo / doing / done). Tasks are persisted in **Supabase Postgres**. Access is protected by email/password authentication via Supabase Auth.

**Pages:**
- `/` — public landing page with hero, features section, and CTAs linking to `/login`
- `/login` — auth form (signin / signup toggle); redirects to `/board` on success
- `/board` — protected board page; redirects unauthenticated users to `/`

**Middleware (`src/proxy.ts`):**
- Refreshes Supabase session cookies on every request
- Redirects unauthenticated requests to `/board/*` → `/`
- Redirects authenticated requests to `/` or `/login` → `/board`

**Data flow:**
- `src/types/kanban.ts` — `Task` and `Column` types; `COLUMNS` constant (the three fixed columns, labeled in pt-BR); `ColumnId` union type
- `src/lib/supabase.ts` — browser-side Supabase client (uses `createBrowserClient`)
- `src/lib/supabase-server.ts` — server-side Supabase client (uses `createServerClient` with cookie handling for SSR)
- `src/lib/storage.ts` — async CRUD against the Supabase `tasks` table: `loadTasks`, `insertTask`, `updateTask`, `deleteTask`, `upsertTasks`; seeds 4 demo tasks on first load if table is empty
- `src/hooks/useKanban.ts` — single source of truth; loads tasks from Supabase on mount (`hydrated` flag); exposes `addTask`, `updateTask`, `deleteTask`, `moveTask`, `tasksForColumn`; syncs every mutation back to the DB
- `src/components/Board.tsx` — `DndContext` wrapper; handles `onDragStart/Over/End` to call `moveTask`; renders `Column` for each entry in `COLUMNS`
- `src/components/Column.tsx` — droppable zone (`useDroppable`) + `SortableContext`; hosts `TaskCard` list and "Adicionar tarefa" button; shows per-column task count badge
- `src/components/TaskCard.tsx` — sortable drag handle (`useSortable`); hover actions open `TaskModal` for edit or call `onDelete`; `overlay` prop enables ghost card rendering
- `src/components/TaskModal.tsx` — shared create/edit modal (title required, description optional); Portuguese labels ("Nova tarefa" / "Editar tarefa")
- `src/components/UserMenu.tsx` — displays logged-in user email in the header; logout button calls `supabase.auth.signOut()` and redirects to `/`
- `src/components/ThemeProvider.tsx` — thin wrapper around `NextThemesProvider` with `attribute="class"`, `defaultTheme="system"`
- `src/components/ThemeToggle.tsx` — sun/moon icon toggle in the sticky header

**Database schema (`tasks` table):**
| Column | Type | Notes |
|--------|------|-------|
| `id` | `text` | UUID, primary key |
| `title` | `text` | required |
| `description` | `text` | nullable |
| `column_id` | `text` | `"todo"` \| `"doing"` \| `"done"` |
| `order` | `integer` | position within column |

**Theme:** `next-themes` with `attribute="class"`, `defaultTheme="system"`; toggled via `ThemeToggle` in the sticky header. Custom CSS variables in `src/app/globals.css` define the full light/dark color palette (`--canvas`, `--ink`, `--primary`, etc.).

**Drag-and-drop:** `@dnd-kit/core` + `@dnd-kit/sortable`. Cross-column moves happen during `onDragOver`; same-column reorders are finalized in `onDragEnd`. A `DragOverlay` renders a rotated/scaled ghost card. Moving a task rewrites `order` for all affected tasks and calls `upsertTasks`.

**Columns are fixed** — `COLUMNS` in `kanban.ts` is the authoritative list and is not user-editable.
