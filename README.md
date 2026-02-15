# Task Flow Lite

A modern Angular learning project focused on clean architecture, Signals, and job-ready development practices.

## Tech Stack

- Angular (Standalone)
- TypeScript
- SCSS
- pnpm
- Reactive Forms
- Angular Signals (`signal`, `computed`, `effect`)
- Husky + lint-staged + Prettier
- Vitest (Unit Tests)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm

### Install & Run

```bash
pnpm install
pnpm start

Open http://localhost:4200/.

Run Tests
pnpm test

Current Features
	•	App shell with navigation
	•	Home page
	•	Dashboard task management (CRUD):
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
	•	localStorage persistence (save + restore)
	•	Reset demo data action

Unit Tests (Dashboard)

Covered core behavior:
	•	component creation
	•	toggle task status
	•	filter open tasks
	•	reset demo data
	•	delete task
	•	prevent save on invalid edit title

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
	•	Improve accessibility (labels, keyboard flow, focus states)
	•	Add user feedback/toasts for actions (save/delete/edit)
	•	Extract task state logic into a dedicated store/service
	•	Add more unit tests for edge cases

Author

Matthias
```
