# Rust Certification Roadmap

A structured 120-day learning plan web application to pass the **Ardan Labs Rust Certification** and land a remote Rust developer job.

## Features

- **Dashboard** - Today's plan, streak counter, phase progress, quick stats
- **Roadmap** - Visual 120-day roadmap with 6 phases, color-coded day cards
- **Day Detail** - Detailed lessons, exercises, code challenges, notes, and ratings
- **Mock Exam** - Timed exam simulator (Full/Quick/Topic modes) with 74 original questions
- **Job Tracker** - Kanban board with drag-and-drop for tracking job applications
- **Progress** - Charts, skill radar, activity heatmap, completion forecast
- **Resources** - Curated links for Rust learning, practice, and career

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript** (strict)
- **TailwindCSS** + **shadcn/ui** (base-ui)
- **Zustand** with localStorage persistence
- **Recharts** for data visualization
- **@dnd-kit** for drag-and-drop
- **canvas-confetti** for celebrations
- **Lucide React** icons

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to start your Rust learning journey.

## Curriculum

| Phase | Days | Focus |
|-------|------|-------|
| Foundation | 1-21 | Rust basics, ownership, structs, enums |
| Intermediate | 22-50 | Traits, generics, lifetimes, modules |
| Advanced | 51-75 | Async, concurrency, unsafe, performance |
| Exam Prep | 76-95 | Topic reviews, mock exams, remediation |
| Job Hunt | 96-110 | Resume, portfolio, applications |
| Interview Prep | 111-120 | Technical interviews, system design |

## Deployment

Vercel-ready. Push to GitHub and connect to Vercel for automatic deployments.

```bash
npx vercel
```
