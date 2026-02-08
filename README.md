# Task Flow Lite

A modern Angular learning project focused on clean architecture, Signals, and job-ready development practices.

## Tech Stack

- Angular (Standalone)
- TypeScript
- SCSS
- pnpm
- Husky + lint-staged + Prettier

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm

### Install & Run

```bash
pnpm install
pnpm start
```

Open http://localhost:4200/.

Current Features
• App shell with navigation
• Home page
• Dashboard with task list
• Signals + computed stats (total/open/done)
• Toggle task status (immutable update)

Project Structure

src/app/core
src/app/shared
src/app/features/home
src/app/features/dashboard

Next Steps
• Add task filters (All/Open/Done)
• Add task form with validation
• Persist tasks in localStorage
