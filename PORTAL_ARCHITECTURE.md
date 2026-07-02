# Pixel & Proof HQ - Portal Architecture & Workflows

This document serves as the master blueprint for the Pixel & Proof HQ portal. It outlines the technology stack, the module ecosystem, the design philosophy, and the data strategy.

## 1. Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom global CSS variables for a premium, dark-mode biased glassmorphism aesthetic.
- **UI Components**: shadcn/ui (Radix primitives) combined with Lucide React icons.
- **State & Data Fetching**: React Query (`@tanstack/react-query`) for client-side state management and caching.
- **Backend/Database**: Supabase (PostgreSQL, Auth, Storage).

## 2. The Data Strategy (Crucial Context)
Because of local DNS issues blocking direct access to Supabase in development, **every single mutation and query in the app has a local mock fallback**. 
- The hooks (e.g., `useClients`, `useContent`) live in `src/hooks/`. They attempt to fetch from Supabase, but if they hit a `TypeError: Failed to fetch` or an Auth error, they catch the error and resolve with static mock data from `src/features/*/data/mock-*.ts`.
- The mutations (e.g., `useCreateClient` in `src/features/clients/api/client-mutations.ts`) do the same. If Supabase fails, they mutate the local mock array in memory so the UI still updates realistically for demonstration purposes.

## 3. Module Ecosystem & Workflows

### Dashboard (`/`)
- **Purpose**: The agency command center.
- **Key Features**: 
  - Real-time greeting based on the hour.
  - "My Action Items" feed that pulls directly from the Tasks module.
  - "Content Priority" feed that highlights deliverables due soon.
  - Global Command Menu (Cmd+K) trigger for fast navigation.

### Clients (`/clients`)
- **Purpose**: Agency CRM and dedicated workspace per client.
- **Workflow**: 
  - The main page lists all clients with an "Add Client" dialog.
  - Clicking a client routes to `/clients/[id]`, which is a **Tabbed Workspace**.
  - The Workspace tabs include Overview (LTV, active services), Content (filtered to that client), Assets (filtered to that client), and Invoices.

### Content Pipeline (`/content`)
- **Purpose**: Manage the lifecycle of creative deliverables.
- **Workflow**: 
  - Includes three distinct views: Kanban Board, List View, and Calendar View.
  - Features a **Global Client Filter** at the top. If "All Clients" is selected, you see the entire agency's pipeline. If a client is selected, the pipeline instantly filters to only show their deliverables.

### Idea Vault (`/ideas`)
- **Purpose**: A Pinterest-style moodboard for creative inspiration.
- **Workflow**: 
  - Displayed in a visually stunning masonry grid based on image aspect ratios.
  - **"Push to Pipeline"**: A button on every idea card allows you to instantly convert an inspirational idea into a tangible deliverable in the Content Pipeline.

### Assets Drive (`/assets`)
- **Purpose**: A Google Drive-style file manager for deliverables, brand assets, and raw files.
- **Workflow**: 
  - Has Grid and List views. 
  - Shares the Global Client Filter logic with the Content Pipeline.
  - *Pending Feature*: Needs `react-dropzone` implemented for real drag-and-drop file uploads.

### Knowledge Base (`/knowledge`)
- **Purpose**: Agency SOPs, brand guidelines, and documentation.
- **Workflow**: 
  - Notion-style dual-pane layout (sidebar with document tree, main area for content).
  - *Pending Feature*: Needs a block-style rich text editor (e.g., BlockNote, TipTap) integrated into the main area so documents can actually be written and edited.

### Global Tasks (`/tasks`)
- **Purpose**: Internal agency task management.
- **Workflow**: 
  - Linear-style layout. Groups tasks horizontally or vertically by status (Todo, In Progress, In Review, Done).
  - Feeds directly into the Dashboard's "My Action Items" list.

### Finance (`/finance`)
- **Purpose**: Revenue tracking and invoicing.
- **Workflow**: 
  - Displays MRR (Monthly Recurring Revenue) charts and outstanding balances.
  - *Pending Feature*: Needs an Invoice Generator modal that creates a PDF preview of an invoice.

## 4. Design Philosophy
- **Premium Aesthetics**: The app relies heavily on dark backgrounds (`bg-background`), subtle borders (`border-border/50`), and `backdrop-blur` for a glassmorphism effect.
- **Micro-animations**: Elements scale up on hover (`group-hover:scale-105`), opacity transitions smoothly, and colors shift gently.
- **Information Density**: Inspired by Linear and Notion, the UI packs a lot of data into small spaces using badges, tiny text (`text-[10px]`), and careful typography without feeling cluttered.
