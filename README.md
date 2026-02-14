# Task Flow Lite

A modern Angular learning project focused on clean architecture, Signals, and job-ready development practices.

## Tech Stack

- Angular (Standalone)
- TypeScript
- SCSS
- pnpm
- Reactive Forms
- Angular Signals (`signal`, `computed`)
- Husky + lint-staged + Prettier

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm

### Install & Run

```bash
pnpm install
pnpm start

Open http://localhost:4200/.

Current Features
	•	App shell with navigation
	•	Home page
	•	Dashboard task management (CRUD)
	•	Add task (Reactive Form + validation)
	•	Edit task inline (title + description)
	•	Toggle task status (Open/Done)
	•	Delete task
	•	Task filters (All, Open, Done)
	•	Signal-based derived state:
	•	total tasks
	•	open tasks
	•	done tasks
	•	Immutable state updates for all task actions

Project Structure
src/app/
  core/
  shared/
  features/
    home/
    dashboard/

    Code Quality
	•	Prettier for formatting
	•	Husky pre-commit hook
	•	lint-staged on changed files
	•	Conventional Commits

Git Workflow

Feature-branch based workflow:
	1.	Create feature branch
	2.	Commit in small logical steps
	3.	Merge into main
	4.	Push main
	5.	Delete merged feature branch

  Next Steps
	•	Persist tasks in localStorage
	•	Add unit tests for dashboard logic
	•	Improve accessibility (labels, keyboard flow, focus states)
	•	Add small notifications (e.g. save/delete feedback)

Author

Matthias
```
