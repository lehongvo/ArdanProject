---
name: Tech Stack and Architecture
description: Next.js 16.2.2 + React 19 + Tailwind 4 + Zustand 5 — key patterns and gotchas
type: project
---

**Framework:** Next.js 16.2.2 with App Router (NOT Pages Router)
**Language:** TypeScript strict mode
**Styling:** Tailwind CSS v4 (uses @import "tailwindcss" not @tailwind directives)
**State:** Zustand v5 with persist middleware → localStorage key: "blockchain-roadmap-progress"
**Icons:** Lucide React v1.7+
**Charts:** Recharts v3
**DnD:** @dnd-kit/core + @dnd-kit/sortable
**Confetti:** canvas-confetti

**Design tokens (CSS vars in globals.css):**
- `--background: #0A0A0A`
- `--card: #111111`
- `--border: #222222`
- Primary accent: `#F97316` (orange)
- ZK accent: `#8B5CF6` (purple)

**Key lib exports:**
- `lib/roadmap-data.ts` → `PHASES`, `getPhaseById()`, `getAllTasks()`, `TOTAL_WEEKS`
- `lib/progress-store.ts` → `useProgressStore`, `computePhaseProgress()`, `getLeetcodeStats()`, `getMockAverage()`
- `lib/exam-questions.ts` → `EXAM_QUESTIONS`, `getRandomQuestions()`, `getMixedRandomQuestions()`
- `lib/leetcode-data.ts` → `LEETCODE_PROBLEMS`
- `lib/solana-projects.ts` → `SOLANA_PROJECTS`

**Important patterns:**
- Phase page at `/phase/[id]` is 'use client' because it uses hooks; uses `use(params)` from React 19
- All Zustand hooks require 'use client' directive
- Task IDs follow pattern: `p{phaseId}w{weekNum}d{day}` e.g. `p1w1d1`
- `computePhaseProgress` filters completedTasks by `id.startsWith('p{phaseId}w')`
- Tailwind v4 does NOT have bg-opacity-* classes; use `/` syntax: `bg-[#F97316]/10`

**How to apply:** When adding new features, follow these patterns exactly to avoid TypeScript errors.
